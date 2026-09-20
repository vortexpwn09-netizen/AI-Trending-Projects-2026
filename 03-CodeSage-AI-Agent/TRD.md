# TRD - CodeSage AI Agent

## 1. Tech Stack
**Frontend:** Next.js 15 + Tailwind + shadcn + Octokit
**Backend:** FastAPI + LangGraph (agent) + Celery + Redis
**GitHub:** GitHub App (Probot style) + Octokit.py
**LLM:** GPT-4o (review), GPT-4o-mini (Q&A), Claude 3.5 alternative
**Code Parse:** Tree-sitter (for chunking), tiktoken (token count)
**Vector DB:** Qdrant (codebase embeddings)
**DB:** Postgres (PRs, reviews)
**Queue:** Celery + Redis (PR review jobs)

## 2. Architecture
```
GitHub PR opened
      |
      ▼ Webhook POST /webhook/github
┌──────────────┐
│ FastAPI      │ -> Verify signature (GITHUB_WEBHOOK_SECRET)
│              │ -> Enqueue Celery task `review_pr(pr_id)`
└──────┬───────┘
       ▼
┌──────────────┐      ┌──────────────┐
│ Celery Worker│─────►│ GitHub API   │ (fetch diff, files)
│ LangGraph    │◄─────┤              │
│ Agent        │      └──────────────┘
└──────┬───────┘
       │ LLM calls (chunked files)
       ▼
┌──────────────┐
│ Postgres     │ (store review)
│ + Comment via│ GitHub API `createReview`
└──────────────┘
```

## 3. LangGraph Agent Flow
```
State: {pr_diff, files[], repo_context}
Nodes:
1. parse_diff -> split by file, filter lock files
2. retrieve_context -> Qdrant search similar code (for context)
3. review_file (parallel) -> LLM prompt per file
4. aggregate -> combine + dedupe
5. post_comment -> GitHub API
```

**Prompt per file:**
```
You are senior reviewer. Review this diff:
File: app/auth.py
Diff: {diff}
Context: {retrieved similar code}
Give: Severity (critical/major/minor), Issue, Suggestion, Fixed Code block
Return JSON: [{line, severity, comment, fix}]
```

## 4. Data Models
```sql
installations (id, github_install_id, account)
repositories (id, installation_id, full_name)
pull_requests (id, repo_id, number, diff_url, status)
reviews (id, pr_id, file, line, severity, comment, fix, created_at)
embeddings (repo_id, file_path, chunk, vector_id)
```

## 5. API
- `POST /webhook/github` - GitHub webhook
- `GET /api/repos` - list installed repos
- `GET /api/prs?repo=xxx` - PRs
- `POST /api/chat/repo` {repo, question} -> RAG answer
- `POST /api/autofix` {pr_id, review_id} -> create fix branch + PR

## 6. Auto-Fix Flow
1. User clicks Auto-fix -> Backend creates branch `codesage/fix-pr-123`
2. Applies LLM suggested fix via `git apply` -> Commit -> Push via GitHub App token
3. Opens PR or pushes to same PR branch (if permission)

## 7. Repo Q&A (RAG)
- On install: Clone repo shallow -> Chunk via Tree-sitter (functions/classes) -> Embed -> Qdrant
- On question: Embed query -> Qdrant top 5 -> LLM answer with file refs
- Webhook `push` -> incremental re-index

## 8. Security
- GitHub webhook signature verify (HMAC SHA256)
- App permissions: `pull_requests:write`, `contents:read` only (least privilege)
- Do not store code > 7 days, vector only
- Prompt injection guard: diff is data, not instruction

## 9. Performance
- Chunk large PRs: 200 lines per LLM call, parallel 5x
- Cache reviews for same commit SHA
- Use GPT-4o-mini for small files, GPT-4o for critical

## 10. DevOps
- Docker + Celery worker separate
- Ngrok for local webhook dev
- Env: `GITHUB_APP_ID, PRIVATE_KEY, WEBHOOK_SECRET, OPENAI_KEY, QDRANT_URL`
- Deploy: Fly.io (backend + worker) + Vercel (frontend)

## 11. Testing
- Mock GitHub webhook payload
- Unit: diff parser, prompt builder
- E2E: Open test PR in fixture repo -> assert comment

## 12. Risks
- LLM hallucinated issues -> Add confidence threshold + user feedback loop (👍/👎)
- Rate limit GitHub API -> Use App token (5000/hr) + caching
