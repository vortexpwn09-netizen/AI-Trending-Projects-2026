# RepoAtlas AI - GitHub to Obsidian Vault Knowledge Graph

Open-source AI tool jo kisi bhi GitHub repo ko 2 minute me Obsidian vault me convert karta hai. Codebase ka knowledge graph, docs, ER diagrams, API specs aur daily journal auto-generate hota hai.

**GitHub Trending Potential:** 16k+ stars | **Category:** DevTools, Knowledge Graph, Obsidian, RAG
**Stack:** Next.js 15, FastAPI, Tree-sitter, LangGraph, Qdrant, Postgres, Obsidian Vault Format, GitHub API, Docker

### Problem Kya Solve Karta Hai
Har developer ko nayi repo samajhne me 2-3 din lagte hain. README adhura, docs outdated. RepoAtlas 10,000 files ko padh kar tumhare liye searchable vault banata hai jisme har service, API aur DB schema ka MOC ready hai.

### Key Features
1. GitHub URL paste karo ya local folder select karo - 60 sec me clone + analyze
2. Auto Obsidian Vault - 00 Home, 03 Projects, 05 Technology, 09 Knowledge structure me markdown + frontmatter + wikilinks
3. Knowledge Graph - Canvas file + Interactive graph view (React Flow) me services, DB, APIs ke connections
4. Ask Repo - RAG chat - puchho "auth kaise kaam karta hai?" to exact file + line ke sath answer
5. ER Diagram + API Docs - Prisma/Drizzle schema se ER, FastAPI/Express routes se OpenAPI
6. Daily Journal Sync - `git log` se roz ka Obsidian daily note - kya badla, kisne kya kiya

### Quick Start (2 min)
```bash
git clone https://github.com/vortexpwn09-netizen/AI-Trending-Projects-2026.git
cd 06-RepoAtlas-AI-Vault
docker-compose up -d  # postgres + qdrant
pip install -r backend/requirements.txt
npm install --prefix frontend
cp developer/.env.development.example developer/.env.development  # hidden locally
# OPENAI_API_KEY aur GITHUB_TOKEN set karo
npm run dev  # frontend:3000 backend:8000
# Browser me http://localhost:3000 -> GitHub URL paste karo -> Generate Vault
```

### Docs
- `PRD.md` - Product requirements
- `TRD.md` - Technical requirements, DB schema, APIs
- `architecture.md` - System architecture, Docker, frontend, Obsidian vault format
- `SKILLS.md` - Skills, learning path, easy setup
- `SEO.md` - GitHub + Google SEO

### Example
```bash
Input: https://github.com/owner/my-saas
Output:
  vault/
    00 Home/Index.md
    03 Projects/MySaas/MOC.md
    05 Technology/Stack.md  # Next.js, Postgres, etc. auto detected
    09 Knowledge/API_Routes.md
    graph.json  # Obsidian graph
    canvas/Architecture.canvas
```

MIT License - For teams who live in Obsidian + GitHub.
