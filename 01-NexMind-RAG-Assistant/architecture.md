# Architecture | NexMind RAG Assistant

## 1. Overview Diagram
```
                    ┌─────────────────┐
                    │  Next.js 15     │
                    │  (Vercel)       │◄─── Clerk Auth
                    │  Chat UI +      │
                    │  Upload +       │
                    └───────┬─────────┘
                            │ REST + SSE
                            ▼
                    ┌─────────────────┐      ┌──────────────┐
                    │  FastAPI        │─────►│ Qdrant Cloud │
                    │  LangChain      │      │ Vector DB    │
                    │  RAG Pipeline   │◄─────┤ HNSW Index   │
                    └───────┬─────────┘      └──────────────┘
                            │
               ┌────────────┼────────────┐
               ▼            ▼            ▼
        ┌──────────┐  ┌──────────┐ ┌──────────┐
        │ Postgres │  │  S3 /    │ │ LLM APIs │
        │ (Neon)   │  │ Supabase │ │ OpenAI,  │
        │ Chat +   │  │ Storage  │ │ Gemini,  │
        │ Docs meta│  │ PDFs     │ │ Ollama   │
        └──────────┘  └──────────┘ └──────────┘
```

## 2. Frontend Architecture (Next.js)
- **App Router:** `/app (auth) /dashboard /chat/[id] /upload`
- **Components:** `ChatMessage`, `CitationCard`, `FileDropzone`, `SourceViewer`
- **State:** Zustand `useChatStore` (messages, streaming), TanStack Query for docs
- **Streaming:** `fetch('/api/chat', {stream:true})` -> ReadableStream -> typewriter effect
- **UI Lib:** shadcn/ui, Tailwind, Framer Motion for polish

## 3. Backend Architecture (FastAPI)
```
/backend
  /app
    main.py (FastAPI app)
    /routers - auth.py, documents.py, chat.py
    /services - ingestion.py, retrieval.py, embedding.py, llm.py
    /core - config.py, qdrant_client.py, db.py
    /models - schemas.py (Pydantic)
```

**Ingestion Flow (Sequence):**
1. User upload -> FastAPI saves to temp -> S3
2. Background task `ingest_document(doc_id)` -> Loader -> Chunker -> Embed -> Qdrant
3. Update Postgres `documents.status = indexed`
4. WebSocket `ws://backend/ws/progress/{doc_id}` -> frontend progress bar

**Chat Flow:**
1. User query -> Backend -> Embed query -> Qdrant search (top 10)
2. Rerank -> Top 5 -> Build prompt -> LLM stream
3. Stream tokens + citations -> Frontend
4. Save message to Postgres async

## 4. Data Flow & Storage
- **Qdrant Payload:** `{user_id, doc_id, filename, page, chunk_index, text}`
- **Filtering:** `must: [{key: "user_id", match: {value: "user_123"}}]` -> Multi-tenant isolation
- **Postgres:** Relational data, Qdrant: Vectors only (separation of concerns)

## 5. Scalability & Choices
- Why Qdrant over Pinecone? Open source, self-host free, payload filtering fast
- Why FastAPI over Express? LangChain Python ecosystem best for RAG
- Why Hybrid Search? Pure vector fails on exact keywords like "error code 500"

## 6. Security
- Clerk JWT verification middleware on every route
- User can only query own `user_id` filtered vectors (no cross-tenant leak)
- Presigned S3 URLs (expiry 1h)

## 7. Deployment Architecture
- **Docker Compose (Local):** 5 services (frontend:3000, backend:8000, qdrant:6333, postgres:5432, redis:6379)
- **Prod:** Vercel (frontend) + Railway (backend docker) + Qdrant Cloud + Neon Postgres
- **CI/CD:** GitHub Actions on push to main -> auto deploy

## 8. Cost Optimization
- Embedding cache (Redis) -> Same doc re-upload 0 cost
- Use `gpt-4o-mini` (cheaper 60x vs gpt-4o) + local Ollama option
- Qdrant free tier 1GB enough for ~500 PDFs

## 9. Monitoring
- Prometheus + Grafana for latency
- Sentry for errors
- LangSmith for LLM tracing

## 10. Extension Points
- Add `MCP Server` for Claude Desktop integration
- Add `Chrome Extension` -> `content.js` scrapes page -> POST to `/api/documents/url`
