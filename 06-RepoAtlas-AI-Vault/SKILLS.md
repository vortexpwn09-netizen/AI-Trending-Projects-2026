# SKILLS.md - RepoAtlas AI Vault

## 1. Required Skills

| Skill | Level | Where Used | Easy Alternative |
|---|---|---|---|
| Next.js 15 + React Flow | Beginner | Frontend graph + chat | shadcn templates copy |
| FastAPI + Python | Beginner | Backend API | Boilerplate provided |
| Tree-sitter | Intermediate | Code parsing | Docs 30 min, copy parser |
| LangGraph | Intermediate | LLM analyzer | Provided graph template |
| Qdrant / PGVector | Beginner | Vector search | Qdrant Cloud free, no setup |
| Postgres + Prisma | Beginner | Metadata | Neon free, schema ready |
| Docker / Compose | Beginner | Run all services | `docker-compose up` 1 command |
| Obsidian Vault Format | Beginner | Markdown + frontmatter + canvas | Template vault provided |
| GitHub API | Beginner | Clone + webhook | Octokit wrapper ready |

No need for deep ML theory. Models are pre-trained.

## 2. OpenCode Skills for This Project
```json
{
  "skills": [
    "nextjs-shadcn-skill - UI scaffold",
    "fastapi-crud-skill - API routes",
    "tree-sitter-skill - parse code",
    "qdrant-skill - vector store",
    "obsidian-vault-skill - generate vault md + canvas",
    "docker-deploy-skill - compose up"
  ]
}
```
Add to `.opencode/skills/` to make project easy for contributors.

## 3. Easy Setup (10 min)
```bash
cd 06-RepoAtlas-AI-Vault
docker-compose up -d  # postgres + qdrant + redis
pip install -r backend/requirements.txt
npm install --prefix frontend
cp developer/.env.development.example developer/.env.development  # hidden locally
# Set in .env.development (hidden file):
# OPENAI_API_KEY=sk-xxx
# GITHUB_TOKEN=ghp_xxx (only for private repos)
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/repoatlas
# QDRANT_URL=http://localhost:6333
npm run dev  # frontend
uvicorn backend.app.main:app --reload --port 8000  # backend
# Open http://localhost:3000 -> paste https://github.com/owner/repo -> Generate
```

No GPU needed. Embeddings via API, parsing is CPU.

## 4. Learning Path (3 Days)
- Day 1: Tree-sitter parse 2 hr + Next.js graph view
- Day 2: Vault generator templates + frontmatter + wikilinks
- Day 3: Qdrant RAG chat + Docker compose + launch

## 5. How To Make Relevant & Easy
- README has GitHub repo -> Obsidian vault 30 sec GIF demo (stars 3x)
- Topics include obsidian + github + rag
- Provide `.env.example` not real .env, hidden real file
- SKILLS file helps new devs in 10 min

## 6. Common Fixes
- `QDRANT_URL not found` -> Check hidden `developer/.env.development`
- `Tree-sitter language not found` -> `pip install tree-sitter-languages`
- `Obsidian canvas not opening` -> Validate JSON with Obsidian Canvas spec
- `Clone fails private repo` -> Add GITHUB_TOKEN with repo scope
- `docker-compose port 5432 busy` -> Change to 5433 in compose

## 7. Reuse From Previous 5 Projects
- Auth (Clerk), DB (Neon), Qdrant, Docker, Next.js all reuse from NexMind etc.
- 70 percent code reusable

## 8. Obsidian + GitHub Integration Tips
- Generated vault goes to `Showcase/Projects` style - same as your existing vault
- Use wikilinks `[[05 Technology/Stack]]` so graph view connects automatically
- GitHub webhook for daily sync: set `WEBHOOK_SECRET` hidden
