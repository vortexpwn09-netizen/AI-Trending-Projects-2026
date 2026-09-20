# SKILLS.md | AutoFlow - Skills & Easy Path

## 1. Skills Needed

| Skill | Level | Notes |
|---|---|---|
| **Next.js + React Flow** | Intermediate | Drag-drop builder, docs 30 min |
| **LangGraph** | Intermediate | Agent graph, copy our code |
| **Inngest** | Beginner | Durable workflows, 1 tutorial |
| **OAuth** | Beginner | Clerk + template |
| **Playwright/E2B** | Beginner | Tools already wrapped |

**No need to know agent theory deeply** - prompts ready.

## 2. OpenCode Skills
```
- langgraph-skill - scaffold agents
- inngest-skill - durable steps
- react-flow-skill - visual builder
- oauth-skill - Gmail/Notion connect
- tavily-skill - search tool
```

## 3. Easy Setup (12 min)
```bash
cd 05-AutoFlow-AI-Agents
docker-compose up -d  # postgres + redis + inngest dev server
pip install -r backend/requirements.txt
npm install --prefix frontend
cp .env.example .env
# OPENAI_API_KEY, TAVILY_API_KEY (free), SUPABASE_URL, E2B_API_KEY (free tier)
npx inngest-cli dev  # inngest local
npm run dev --prefix frontend
uvicorn backend.main:app --reload
# Open http://localhost:3000 -> Try "Research AI tools and make notion page"
```

**No E2B?** Use local fallback: `CODE_RUNNER=local`

## 4. Learning Path (3 Days)
- Day1: LangGraph + Inngest basics (2 hr)
- Day2: React Flow builder (2 hr)
- Day3: OAuth + templates

## 5. Trending Tips
- Topics: `ai-agents`, `langgraph`, `automation`, `crewai`, `autogpt`, `zapier-alternative`, `n8n`, `inngest`, `playwright`, `nextjs`
- README me GIF: Prompt -> agents working -> Notion result (magic)
- Templates: Publish 10 templates -> SEO

## 6. Fixes
- `Inngest not triggering` -> Check `INNGEST_EVENT_KEY` + dev server running
- `OAuth failed` -> Check redirect URL in Google Cloud console
- `Playwright timeout` -> Increase to 30s, add waitForSelector

## 7. Reuse
- Auth, DB, deployment from Project 1-4 same
- Agents reuse LLM logic

## 8. Why This Makes Project Relevant & Easy
- Skills file se new contributor 10 min me samjhega kaunsa agent kya karta hai
- All prompts commented in Hindi+English -> easy for you
