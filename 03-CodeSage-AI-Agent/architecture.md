# Architecture | CodeSage AI Agent

## 1. High-Level
```
┌─────────────┐      ┌──────────────────┐      ┌──────────────┐
│   GitHub    │─────►│ FastAPI + Celery │─────►│  LLM (GPT-4o)│
│  PR Event   │      │ LangGraph Agent  │      │  per file    │
└─────────────┘      └────────┬─────────┘      └──────┬───────┘
                              │                       │
                              ▼                       ▼
                     ┌─────────────────┐      ┌──────────────┐
                     │  Postgres       │      │ Qdrant       │
                     │  PRs + Reviews  │      │ Code Vectors │
                     └────────┬────────┘      └──────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Next.js Dashboard│
                     │ + VS Code Ext   │
                     └─────────────────┘
                              │
                              ▼ GitHub API comment
                     ┌─────────────────┐
                     │ GitHub PR       │
                     │ Review Comments │
                     └─────────────────┘
```

## 2. GitHub App Setup
- Create GitHub App: `https://github.com/settings/apps/new`
- Webhook URL: `https://your-fly-app.fly.dev/webhook/github`
- Permissions: `Pull requests Read & Write`, `Contents Read`, `Metadata Read`
- Events: `Pull request`, `Push` (for re-index)
- Install on repo -> `installation_id` saved

## 3. Backend Modules
```
/backend
  app/
    webhook.py (verify + enqueue)
    agent/
      graph.py (LangGraph definition)
      reviewer.py (LLM call)
      context.py (Qdrant retrieve)
    github.py (Octokit wrapper)
    tasks.py (Celery)
```

**Celery Flow:**
- `review_pr.delay(install_id, repo, pr_number)` -> worker picks
- Worker fetches diff: `GET /repos/{owner}/{repo}/pulls/{number}/files`
- For each file: `review_file` node parallel

## 4. Frontend Dashboard
- **Pages:** `/dashboard`, `/repo/[owner]/[repo]`, `/pr/[id]`, `/chat`
- **Components:** `PRList`, `ReviewCard` (severity badge), `DiffViewer` (react-diff-view), `AutoFixButton`
- **Auth:** GitHub OAuth via Clerk (mirror GitHub login)

## 5. Codebase Indexing (RAG)
```
Clone (sparse) -> Tree-sitter parse -> Chunk by function (max 500 tokens) -> Embed bge-small -> Qdrant collection per repo `repo_{id}`
```
- On `push` webhook: diff files -> re-embed only changed

## 6. Scalability
- Celery workers scale horizontally (Fly.io 3 workers)
- Qdrant sharding per repo
- Rate limit per installation (queue if burst)

## 7. Security & Privacy
- Private key never leaves server (env var)
- Code vectors only, original code not logged after 7d TTL
- User can `DELETE /api/repo/{id}` -> purge Qdrant + Postgres

## 8. Deployment
- **Local Dev:** `ngrok http 8000` -> set as webhook URL
- **Prod:** Fly.io Docker (FastAPI + Celery + Redis) + Vercel frontend + Qdrant Cloud
- **CI:** GitHub Action tests webhook signature

## 9. Monitoring
- Celery Flower for queue
- LangSmith for LLM traces (cost per PR)
- Sentry

## 10. Future
- Support GitLab via same agent (adapter pattern)
- Fine-tune model on repo's past reviews
