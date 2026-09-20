# SKILLS.md | CodeSage - Skills & Easy Path

## 1. Skills Needed

| Skill | Level | Notes |
|---|---|---|
| **GitHub Apps / Webhooks** | Intermediate | Docs 20 min me ho jayega, boilerplate hai |
| **Python + FastAPI** | Beginner | Same as Project 1 |
| **LangGraph** | Intermediate | Agent flow, humne graph de diya |
| **Tree-sitter** | Beginner | Code chunking, copy-paste |
| **Next.js Dashboard** | Beginner | Same stack |

**No need to be LLM expert** - prompt template ready.

## 2. OpenCode Skills
```
- github-app-skill - webhook verify + Octokit
- langgraph-skill - agent scaffold
- code-rag-skill - index codebase
- diff-parser-skill - PR diff to chunks
```

## 3. Easy Setup (10 min)
```bash
cd 03-CodeSage-AI-Agent
pip install -r requirements.txt
cp .env.example .env
# GITHUB_APP_ID, PRIVATE_KEY (from GitHub App), OPENAI_API_KEY, QDRANT_URL
# Local webhook:
npx ngrok http 8000
# Copy https://xxx.ngrok.io -> GitHub App webhook URL
python backend/main.py
# Install App on test repo -> Open PR -> Dekho magic
```

**Test without GitHub:**
```bash
python scripts/mock_webhook.py --pr 123 --repo test/repo
```

## 4. Learning Path (2 Days)
- Day1: GitHub Apps docs + FastAPI webhook
- Day2: LangGraph review agent + dashboard

## 5. Trending Tips
- Topics: `code-review`, `ai-agent`, `github-app`, `langgraph`, `devtools`, `gpt-4`, `automation`
- README me GIF: PR comment screenshot -> before/after
- Marketplace listing = free stars

## 6. Fixes
- `Webhook 401` -> Check WEBHOOK_SECRET
- `Not commenting` -> Check App permissions `pull_requests:write`
- `Rate limit` -> Use App token not PAT

## 7. Reuse
- Auth, DB, Qdrant from Project 1 reuse
