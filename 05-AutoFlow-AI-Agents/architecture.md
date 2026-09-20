# Architecture | AutoFlow AI Agents

## 1. High-Level
```
┌─────────────────────────┐
│ Next.js Frontend        │
│ ┌─────────┐ ┌─────────┐│
│ │ Chat to │ │ Flow    ││
│ │ Workflow│ │ Builder ││
│ │ (prompt)│ │(ReactFlow)│
│ └────┬────┘ └────┬────┘│
└──────┼──────────┼──────┘
       │          │
       ▼          ▼
┌─────────────────────────┐      ┌──────────────┐
│ FastAPI                 │─────►│ Inngest      │
│ - /generate (LLM)       │      │ Durable      │
│ - /run (trigger)        │◄─────┤ Engine       │
└──────────┬──────────────┘      └──────┬───────┘
           │                             │
           ▼                             ▼
┌─────────────────────────┐      ┌──────────────┐
│ LangGraph Orchestrator  │      │ Agent Tools  │
│ State: {dag, outputs}   │─────►│ Tavily, E2B, │
│ Nodes = DAG steps       │      │ Playwright,  │
└──────────┬──────────────┘      │ Gmail, etc.  │
           │                     └──────────────┘
           ▼ SSE
┌─────────────────────────┐
│ Frontend Live Logs      │
│ + Postgres (runs)       │
└─────────────────────────┘
```

## 2. Frontend
- **Pages:** `/` (chat), `/builder/[id]` (React Flow), `/runs`, `/templates`, `/integrations`
- **Components:** `ChatInput` -> `DagPreview`, `FlowCanvas` (React Flow nodes), `LiveLogPanel` (SSE), `NodeConfig` (drawer)
- **React Flow Nodes:** `AgentNode`, `IntegrationNode`, `TriggerNode` (custom styled)

## 3. Backend Flow
1. **Generation:** User prompt -> GPT-4o system: "You are workflow generator. Output DAG JSON with nodes/edges. Tools: [...]" -> Validate schema -> Save
2. **Execution:** `inngest.send({name: "workflow.run", data: {workflow_id}})` -> Inngest calls `run_workflow` function -> For each DAG node in topological order: `await step.run(node.id, () => executeNode(node))`
3. **Live Logs:** Each `executeNode` publishes to Redis `pubsub:run_id` -> FastAPI SSE endpoint subscribes -> Frontend

## 4. Agent Details
- **Researcher:** `tavily.search` + `llm.summarize`
- **Writer:** `llm.generate` with context from previous nodes `{{node_id.output}}`
- **Browser:** `playwright.goto + extract` via MCP
- **Coder:** `e2b.run_code(python)` -> capture output
- **Messenger:** `slack.postMessage` / `gmail.send`

## 5. DB & State
- Inngest handles durable state, retry, checkpoint (no need custom)
- Postgres stores workflow def + run history for UI
- Redis for pub/sub logs

## 6. Scalability
- Inngest auto scales, handles 1000s concurrent runs
- Agent concurrency via `asyncio.gather` for parallel branches
- Add queue per user (fairness)

## 7. Security
- E2B sandbox isolated, no network except allowed
- OAuth tokens encrypted at rest
- DAG validation: max nodes, no `while` loops

## 8. Deployment
- Vercel frontend, Fly.io backend+inngest worker, Supabase, Upstash Redis, Browserbase for browser
- Env: `OPENAI_KEY, TAVILY_KEY, E2B_API_KEY, INNGEST_SIGNING_KEY`

## 9. Monitoring
- Inngest dashboard (built-in), LangSmith, Sentry, Posthog
- Cost per workflow tracked (tokens)

## 10. Future
- Voice trigger via Whisper
- Marketplace with versioning
- Fine-tune 7B model to replace GPT-4o for cheap generation
