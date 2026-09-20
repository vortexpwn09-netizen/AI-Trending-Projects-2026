# TRD - Technical Requirements Document | NexMind RAG Assistant

## 1. Tech Stack Decision
**Frontend:** Next.js 15 (App Router) + Tailwind + shadcn/ui + Zustand
**Backend:** FastAPI (Python 3.11) + LangChain + LangGraph
**Vector DB:** Qdrant (Recommended) / PGVector (Alternative for cheap hosting)
**LLM:** OpenAI GPT-4o-mini (default), Gemini 1.5 Flash, Ollama (llama3.1:8b) for local
**Embedding:** `text-embedding-3-small` (1536 dim) / `bge-large-en` (local)
**DB:** PostgreSQL (Neon/Supabase) + Prisma/Drizzle
**Auth:** Clerk or Supabase Auth
**Storage:** S3 / Supabase Storage (for PDFs)
**Deployment:** Docker + Vercel (frontend) + Railway/Fly.io (backend) + Qdrant Cloud

## 2. System Architecture (High Level)
```
[User Browser] -> Next.js Frontend -> FastAPI Backend -> Qdrant/Postgres
                      |                      |-> LLM API (OpenAI/Gemini/Ollama)
                      |                      |-> Embedding Service
                      |                      -> PostgreSQL (metadata, chat history)
```

## 3. Core Modules

### 3.1 Ingestion Pipeline
1.  Upload API (`POST /api/ingest`) - Multipart file + URL
2.  Loader: PyPDFLoader, DocxLoader, YoutubeLoader (yt-dlp + whisper if no transcript), WebBaseLoader
3.  Chunker: RecursiveCharacterTextSplitter (chunk_size=800, overlap=150) + Semantic Chunker option
4.  Embedder: Batch embeddings (100 chunks/batch)
5.  Vector Store: Upsert to Qdrant with payload `{user_id, doc_id, page_no, text}`
6.  Status: WebSocket ya polling se frontend ko progress bhejo

### 3.2 Retrieval & Chat
- **Hybrid Search:** Dense vector (0.7) + BM25 keyword (0.3) -> RRF fusion
- **Reranker:** `cohere rerank` ya `bge-reranker-large` (optional but accuracy +15%)
- **Context Window:** Top 5 chunks (max 4000 tokens)
- **Prompt Template:**
```
You are NexMind. Answer ONLY from context. If not in context, say "Context me nahi mila".
Context: {chunks with [Source: doc.pdf p.12]}
Question: {query}
Answer with citations like [1][2].
```
- **Streaming:** FastAPI `StreamingResponse` + OpenAI stream -> Frontend SSE

### 3.3 Database Schema
```sql
users (id, email, clerk_id)
documents (id, user_id, filename, s3_url, status, chunk_count)
chunks (id, doc_id, text, embedding_id, page_no)
conversations (id, user_id, title)
messages (id, convo_id, role, content, sources jsonb, created_at)
```

## 4. API Design
- `POST /api/auth/callback` - Clerk webhook
- `POST /api/documents/upload` - file upload
- `POST /api/documents/url` - {url, type}
- `GET /api/documents` - list
- `DELETE /api/documents/{id}`
- `POST /api/chat` - {convo_id, query, collection_ids} -> stream
- `GET /api/conversations` + `GET /api/conversations/{id}/messages`

## 5. Non-Functional & Security
- Rate limit: 60 req/min per user (Upstash Redis)
- File validation: MIME check, ClamAV scan
- JWT auth on all backend routes
- CORS: Only frontend domain
- Embeddings cached in Redis (24h)

## 6. Performance Targets
- Ingestion: 100 pages < 20s (with async Celery/RQ if needed)
- Chat latency: <2s first token, <3s full answer
- Qdrant HNSW index: `m=16, ef_construct=200`

## 7. DevOps & Deployment
- `docker-compose.yml`: backend, frontend, qdrant, postgres, redis
- CI: GitHub Actions -> lint, test, build
- Env vars: `OPENAI_API_KEY, QDRANT_URL, DATABASE_URL, CLERK_SECRET`
- One-click deploy buttons: Vercel + Deploy with Qdrant Cloud

## 8. Testing Strategy
- Unit: chunker, prompt builder
- Integration: ingest->query flow with mocked LLM
- E2E: Playwright for upload->chat

## 9. Future Scale
- Celery workers for heavy ingestion
- Multi-tenancy via Qdrant collections per user
- Local mode: Fully offline with Ollama + Qdrant docker

## 10. Risks & Mitigations
- LLM cost high -> Use GPT-4o-mini + caching + local fallback
- Hallucination -> Strict prompt + citation enforcement + confidence score
