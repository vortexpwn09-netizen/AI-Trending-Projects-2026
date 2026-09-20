# TRD - AutoFlow AI Agents

## 1. Tech Stack
**Frontend:** Next.js 15 + React Flow (visual builder) + Tailwind + shadcn + SSE logs
**Backend:** FastAPI + LangGraph + CrewAI (agent framework) + Inngest (workflow engine)
**Agents:** LangGraph nodes, each agent is LLM + tools
**Tools:** Tavily (search), E2B (code sandbox), Playwright (browser), Gmail/Notion/Slack APIs, Supabase
**DB:** Postgres (Supabase) + Inngest state
**Queue:** Inngest (durable execution), Redis
**Auth:** Clerk + OAuth2 for integrations

## 2. Architecture
```
[User Chat "Do X"] -> FastAPI /api/workflows/generate -> LLM (GPT-4o) generates DAG JSON
                                                              |
                                                              ▼
                                                      Postgres `workflows` (dag json)
                                                              |
[Trigger: Manual/Schedule/Webhook] -> Inngest `run_workflow(workflow_id)`
                                                              |
                                                              ▼
                                                      LangGraph Orchestrator
                                                     /      |       \
                                          Researcher Writer Browser Coder
                                             |        |       |      |
                                          Tavily   GPT  Playwright E2B
                                             \        |       |      /
                                                              ▼
                                                      SSE Logs -> Frontend Live View
                                                              |
                                                              ▼ Inngest durable steps
                                                      Save result -> Notify Slack/Notion
```

## 3. DAG Format
```json
{
  "nodes": [
    {"id": "1", "type": "trigger", "trigger": "manual"},
    {"id": "2", "type": "agent", "agent": "researcher", "input": "Top 5 AI tools", "tools": ["tavily"]},
    {"id": "3", "type": "agent", "agent": "writer", "input": "Write blog from {{2.output}}"},
    {"id": "4", "type": "integration", "service": "notion", "action": "create_page", "input": "{{3.output}}"}
  ],
  "edges": [{"from":"1","to":"2"},{"from":"2","to":"3"},{"from":"3","to":"4"}]
}
```

## 4. LangGraph Agent Definition
```python
from langgraph.graph import StateGraph

def researcher_node(state):
    query = state["input"]
    results = tavily.search(query)
    summary = llm.invoke(f"Summarize: {results}")
    return {"output": summary}

graph = StateGraph(WorkflowState)
graph.add_node("researcher", researcher_node)
graph.add_node("writer", writer_node)
# ... edges from DAG
```

## 5. Data Models
```sql
users (id, email)
workflows (id, user_id, name, dag jsonb, status, created_at)
runs (id, workflow_id, status, logs jsonb, output jsonb, started_at)
integrations (id, user_id, provider, access_token, refresh_token)
```

## 6. APIs
- `POST /api/workflows/generate` {prompt} -> {dag}
- `POST /api/workflows` {dag} -> save
- `POST /api/workflows/{id}/run` -> trigger Inngest
- `GET /api/runs/{id}/logs` (SSE stream)
- `GET /api/integrations/connect/{provider}` (OAuth)
- `GET /api/templates`

## 7. Integrations (OAuth)
- Use `Auth.js` + `Nango` or custom OAuth for Gmail, Notion, Slack, GitHub, YouTube
- Store tokens encrypted (Supabase Vault)
- Tools call via `composio` or direct API

## 8. Inngest Durable Execution
- Each node is `step.run("researcher", fn)` -> auto retry, checkpoint
- If node fails, `self_heal` node calls LLM to fix input and retry

## 9. Browser Agent
- Playwright via `playwright-mcp` or `browserbase`
- Agent prompt: "Go to {url}, extract {selector}"
- Run in E2B sandbox or Browserbase cloud

## 10. Performance
- Parallel nodes where no dependency (fan-out)
- Stream logs via Redis Pub/Sub -> SSE
- LLM cost: Use GPT-4o-mini for simple, GPT-4o for planning

## 11. Security
- E2B sandbox for code execution (isolated)
- OAuth scopes minimal
- Validate DAG: no infinite loop, max 20 nodes

## 12. DevOps
- Docker: backend, frontend, inngest, redis
- Env: `OPENAI_KEY, TAVILY_KEY, SUPABASE_URL, E2B_KEY, INNGEST_EVENT_KEY`
- Deploy: Vercel frontend, Fly.io backend+inngest, Supabase DB

## 13. Testing
- Mock agents, test DAG execution
- E2E: Generate workflow -> Run -> Assert Notion page created (mock)

## 14. Risks
- LLM generates wrong DAG -> Add human review before run + templates fallback
- Browser flaky -> Retry + screenshot log
