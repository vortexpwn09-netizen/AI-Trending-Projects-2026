# TRD - RepoAtlas AI Vault

## 1. Tech Stack
**Frontend:** Next.js 15 (App Router) + Tailwind + shadcn/ui + React Flow (graph) + Zustand
**Backend:** FastAPI (Python 3.11) + LangGraph + Tree-sitter + GitPython + Qdrant
**LLM:** GPT-4o (analysis + chat), GPT-4o-mini (daily notes), Ollama fallback (llama3.1:8b)
**Embedding:** BGE-small-en (384 dim) local or text-embedding-3-small
**Database:** Postgres (Neon/Supabase) - metadata + users + vaults; Qdrant - vectors per repo
**Obsidian:** Vault format markdown + YAML frontmatter + [[wikilinks]] + Canvas JSON + graph.json
**GitHub:** GitHub API (Octokit) + shallow clone (depth 1)
**Storage:** Local vault zip + S3/R2 (optional cloud vault hosting)
**Queue:** Celery + Redis (for large repo parsing)
**Docker:** docker-compose.yml - frontend, backend, qdrant, postgres, redis
**Auth:** Clerk (GitHub OAuth mirror)

## 2. System Architecture Overview
```
[Next.js Frontend] --REST/SSE--> [FastAPI Backend] --> [GitHub API / Local Upload]
                                          |
                                    [Tree-sitter Parser] --> [LLM Analyzer] --> [Qdrant + Postgres]
                                          |
                                    [Vault Generator] --> [Zip + S3] --> [Download]
                                          |
                                    [RAG Chat] <-- Qdrant Retrieve
```

## 3. Core Modules

### 3.1 Repo Ingestion
- API: `POST /api/vault/create` {github_url, branch, local_upload?}
- Steps:
  1. Clone: `git clone --depth 1 --filter=blob:none {url}` to /tmp/repo_{id} (or unzip local)
  2. Ignore: .git, node_modules, dist, .next, __pycache__, .venv
  3. File walk: Collect files, filter whitelisted extensions .ts .js .py .go .java .md .json .sql
  4. Persist meta to Postgres `vaults` table

### 3.2 Parser (Tree-sitter)
- For each file: Tree-sitter parse -> extract:
  - Functions/classes, imports, exports
  - Route definitions: `app.get|post`, `router`, FastAPI `@app.get`, Express
  - DB models: Prisma schema, Drizzle, SQLAlchemy, Mongoose
  - Config: package.json deps, Dockerfile, docker-compose
- Output JSON per file: `{path, language, functions: [], routes: [], models: [], imports: []}`
- Parallel: ThreadPoolExecutor 8 workers -> 10k files < 60 sec

### 3.3 Tech Stack Detector
- Rules: if `next.config.js` -> Next.js, if `prisma/schema.prisma` -> Prisma, if `requirements.txt` contains `fastapi` -> FastAPI
- Output `stack.json`: `{frontend: [Next.js], backend: [FastAPI], db: [Postgres], infra: [Docker]}`

### 3.4 LLM Analyzer (LangGraph)
- Nodes: `summarize_file` -> `aggregate_module` -> `generate_moc`
- Prompt per module (e.g., `auth` folder): "Summarize these 12 files in 200 words, list APIs, DB tables, and how auth works"
- Generate vault sections sequentially with shared context

### 3.5 Vault Generator
- Templates: Jinja2/Mustache per Obsidian section
- Structure:
```
vault_{repo}/
  00 Home/Index.md  (frontmatter type: home)
  03 Projects/{Repo}/MOC.md  (table of modules with [[links]])
  05 Technology/Stack.md  (stack.json -> markdown + badges)
  09 Knowledge/API_Routes.md  (OpenAPI table)
  09 Knowledge/ER_Diagram.md  (Mermaid erDiagram)
  09 Knowledge/Graph.md
  canvas/Architecture.canvas  (Obsidian Canvas JSON: nodes + edges)
  12 Daily Notes/2026-09-20.md  (git log summary)
  .obsidian/graph.json
  .obsidian/canvas.json
```
- Wikilinks: `[[05 Technology/Stack]]`, `[[09 Knowledge/API_Routes]]`
- Frontmatter example:
```yaml
---
type: project
repo: owner/repo
stack: [Next.js, FastAPI, Postgres]
generated: 2026-09-20
tags: [repoatlas, ai]
---
```

### 3.6 RAG Chat
- Chunk: Split parsed JSON + raw code by function (max 500 tokens, overlap 50)
- Embed: BGE-small batch 64
- Store: Qdrant collection `repo_{vault_id}` payload `{path, function, text}`
- Query: embed question -> Qdrant top 5 -> build prompt -> stream via SSE
- APIs: `POST /api/chat` {vault_id, question} -> stream

### 3.7 Daily Journal Sync
- Cron: On vault open, `git log --since=24h --stat` -> LLM prompt "Summarize changes for Obsidian daily note in Hindi+English, bullet points"
- Append to `12 Daily Notes/YYYY-MM-DD.md`

## 4. Database Schema (Postgres)
```sql
users (id, email, clerk_id)
vaults (id, user_id, repo_url, repo_name, branch, status, stack jsonb, file_count, created_at)
files (id, vault_id, path, language, functions jsonb, routes jsonb, models jsonb)
embeddings (id, vault_id, file_id, chunk_index, vector_id, text)
chats (id, vault_id, user_id, question, answer, sources jsonb)
daily_notes (id, vault_id, date, content_md)
```

## 5. API Design
- `POST /api/vault/create` {github_url} -> {vault_id, status: parsing}
- `GET /api/vault/{id}/status` -> {progress: 0-100, current_file}
- `GET /api/vault/{id}/download` -> zip stream (vault.zip)
- `GET /api/vault/{id}/graph` -> {nodes, edges} for React Flow
- `POST /api/chat` {vault_id, question} -> SSE stream {token, sources:[{path, line}]}
- `POST /api/vault/{id}/daily` -> regenerate daily note
- `GET /api/vaults` -> list user vaults

## 6. Frontend (Next.js)
- Pages: `/` (input), `/vault/[id]` (preview + graph + chat), `/dashboard` (my vaults)
- Components: `RepoInput` (URL + branch + upload), `ProgressBar` (SSE), `GraphView` (React Flow), `VaultPreview` (markdown tree), `ChatPanel` (ask repo)
- State: Zustand `useVaultStore`, TanStack Query for vaults
- Preview: `react-markdown` + `mermaid` for ER, badge for stack

## 7. Docker
- `docker-compose.yml`:
```yaml
services:
  frontend: build: ./frontend, ports: [3000:3000], depends_on: [backend]
  backend: build: ./backend, ports: [8000:8000], volumes: [./tmp:/tmp], depends_on: [qdrant, postgres, redis]
  qdrant: image: qdrant/qdrant, ports: [6333:6333]
  postgres: image: postgres:15, ports: [5432:5432], env_file: .env
  redis: image: redis:7, ports: [6379:6379]
```
- One command: `docker-compose up -d`
- Env: `OPENAI_API_KEY, GITHUB_TOKEN, QDRANT_URL, DATABASE_URL, CLERK_SECRET` -> hidden via .env (not committed)

## 8. Security
- GitHub token optional - public repos need no token, private need PAT with repo:read
- Shallow clone no history leak
- Qdrant payload filtered by `vault_id` + `user_id` (multi-tenant)
- Hide .env files via .gitignore + hidden attribute, never log code content > 7 days

## 9. Performance
- Parser parallel 8 threads -> 10k files 45 sec
- LLM batch: 20 files per prompt -> cost 0.02 dollar per vault
- Qdrant HNSW m=16
- Chat latency < 2 sec first token

## 10. Testing
- Unit: parser for 5 languages, stack detector
- Integration: clone -> parse -> vault zip -> unzip + Obsidian lint
- E2E: Playwright - input GitHub URL -> download vault -> check Index.md frontmatter

## 11. Risks
- Large monorepo -> timeout -> chunk + queue Celery
- LLM hallucination MOC -> add confidence + source refs
- Obsidian format breaking -> validate with obsidian-linter

## 12. No Emoji in Code
- All code blocks avoid emoji. Use ASCII only.
