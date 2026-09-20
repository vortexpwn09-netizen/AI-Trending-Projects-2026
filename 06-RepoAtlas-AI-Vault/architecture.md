# Architecture - RepoAtlas AI Vault

## 1. High-Level Diagram
```
                     +-------------------+
                     | Next.js Frontend  |
                     | 3000 (Vercel)     |
                     | Input + Graph +   |
                     | Chat + Preview    |
                     +---------+---------+
                               | REST + SSE
                               v
                     +-------------------+
                     | FastAPI Backend   |
                     | 8000 (Fly/Railway)|
                     | LangGraph +       |
                     | Tree-sitter       |
                     +---+-------+-------+
                         |       |
             +-----------+       +-----------+
             |                           |
   +------------------+        +------------------+
   | GitHub API /     |        | Qdrant Cloud     |
   | Local Upload     |        | Vectors per repo |
   | Shallow Clone    |        | HNSW             |
   +------------------+        +------------------+
             |                           |
             +-----------+---------------+
                         |
                 +-------+-------+
                 | Postgres (Neon)|
                 | vaults, files |
                 +-------+-------+
                         |
                 +-------+-------+
                 | Redis Queue   |
                 | Celery        |
                 +-------+-------+
                         |
                 +-------+-------+
                 | Vault Storage |
                 | Zip + R2/S3   |
                 +----------------+
                         |
                 +-------+-------+
                 | Obsidian Vault|
                 | (md + canvas) |
                 +----------------+
```

## 2. Frontend Architecture
- **App Router:** `/app/page.tsx` (input), `/app/vault/[id]/page.tsx` (detail), `/app/dashboard/page.tsx`
- **Components:**
  - `RepoInput.tsx` - GitHub URL field, branch select, file drop for local folder
  - `ProgressSSE.tsx` - EventSource `/api/vault/{id}/status` -> progress bar
  - `GraphView.tsx` - React Flow nodes=services, edges=imports/DB relations, minimap
  - `VaultTree.tsx` - File tree of generated vault, click to preview markdown
  - `ChatPanel.tsx` - Ask repo, streaming, citation list
- **State:** Zustand store `{vaultId, progress, graph, chatMessages}`, TanStack Query for vault list
- **Preview:** `react-markdown` + `shiki` code highlight + `mermaid` for ER diagrams
- **Download:** `a[href=/api/vault/{id}/download]` -> vault.zip

## 3. Backend Architecture
```
/backend
  app/
    main.py
    routers/
      vault.py  # create, status, download, graph
      chat.py   # ask repo
    services/
      cloner.py      # git clone --depth 1
      parser.py      # Tree-sitter per language
      stack_detector.py
      vault_generator.py  # Jinja templates -> md + canvas
      rag.py         # chunk + embed + query
      daily.py       # git log -> daily note
    core/
      config.py
      qdrant_client.py
      db.py (SQLAlchemy)
    models/
      schemas.py
```

**Flow Sequence (Create Vault):**
1. Frontend POST /api/vault/create {github_url}
2. Backend creates vault row status=cloning, enqueue Celery `build_vault(vault_id)`
3. Worker clones to /tmp/repo_{id}, parses parallel, detects stack, LLM aggregate, generates vault to /tmp/vault_{id}
4. Zips /tmp/vault_{id} -> /tmp/vault_{id}.zip, uploads to R2 if configured, updates vault status=ready
5. Frontend polls SSE status -> shows graph + download button

## 4. Obsidian Vault Format Details
- **YAML Frontmatter:** Every md has `--- type, repo, stack, generated, tags ---`
- **Wikilinks:** `[[05 Technology/Stack]]`, `[[09 Knowledge/API_Routes#auth]]`
- **Canvas:** `canvas/Architecture.canvas` JSON per Obsidian spec:
```json
{
  "nodes": [
    {"id":"1","type":"text","text":"Frontend (Next.js)","x":0,"y":0,"width":250,"height":100},
    {"id":"2","type":"text","text":"Backend (FastAPI)","x":300,"y":0,"width":250,"height":100}
  ],
  "edges": [
    {"id":"e1","fromNode":"1","toNode":"2","label":"REST /api"}
  ]
}
```
- **Graph:** Vault root has `graph.json` for React Flow preview, maps to Obsidian graph
- **Validation:** Run `obsidian-linter` style checks - frontmatter valid, wikilinks resolve

## 5. Database + Vector
- **Postgres:** Relational metadata, vaults/files/chats. Index on `vaults.user_id`, `files.vault_id`
- **Qdrant:** One collection per vault `repo_{vault_id}` or single collection with filter `vault_id`. Payload `{path, function, text, language}`. HNSW for fast search.

## 6. Docker Compose
```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    env_file: developer/.env.development
    depends_on: [backend]
  backend:
    build: ./backend
    ports: ["8000:8000"]
    volumes: ["./tmp:/tmp", "./vaults:/app/vaults"]
    env_file: developer/.env.development
    depends_on: [qdrant, postgres, redis]
  qdrant:
    image: qdrant/qdrant
    ports: ["6333:6333"]
    volumes: ["qdrant_data:/qdrant/storage"]
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: repoatlas
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports: ["5432:5432"]
    volumes: ["pg_data:/var/lib/postgresql/data"]
  redis:
    image: redis:7
    ports: ["6379:6379"]
volumes:
  qdrant_data:
  pg_data:
```
- **Env hidden:** `developer/.env.development` is hidden (attrib +h) and gitignored, not committed. Example content kept as `.env.example`.

## 7. Security
- Public repos no token, private repos require `GITHUB_TOKEN` with repo scope, stored encrypted, never logged
- Vault access filtered by `user_id`
- Hidden .env files not pushed, check with `git ls-files | grep env` should be empty

## 8. Deployment
- **Local:** `docker-compose up -d` (needs 8GB RAM, 2GB for Qdrant)
- **Cloud:** Vercel frontend, Fly.io backend+workers, Qdrant Cloud, Neon Postgres, R2 for vault zips
- **CI:** GitHub Actions - lint, test parser, build docker

## 9. Scaling
- Celery workers scale horizontally (Fly 3 workers)
- Qdrant sharding per vault
- Incremental sync: webhook on push -> only changed files re-parse

## 10. Monitoring
- Prometheus backend latency, Qdrant ops
- Sentry errors, LangSmith LLM traces

## 11. Future
- Obsidian plugin direct install
- Combined multi-repo vault
- Export to Notion/Confluence
