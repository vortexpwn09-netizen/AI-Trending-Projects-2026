# SKILLS.md | NexMind - Skills & Easy Setup Guide

Is file ka maksad ye hai ki tumhe project banane aur chalane ke liye kaunsi skills chahiye aur kaise easy bana sakte ho - chahe tum beginner ho.

## 1. Required Skills (Relevant & Ordered)

### Level 1: Beginner Friendly (No PhD needed)
| Skill | Kaha Use Hoga | Easy Alternative |
|---|---|---|
| **Python Basics** | FastAPI backend | Humne boilerplate diya hai, sirf env vars badlo |
| **Next.js / React** | Chat UI | shadcn templates copy-paste |
| **Prompt Engineering** | RAG prompt | Humara ready prompt use karo |
| **Git & Docker** | Run karna | `docker-compose up` se 1 command me chalu |

### Level 2: Intermediate (GitHub Trending ke liye)
| Skill | Kyu Important | Resource |
|---|---|---|
| **LangChain / LangGraph** | RAG pipeline | 1 YouTube video (30 min) enough |
| **Vector DB (Qdrant)** | Search | Qdrant Cloud free, no setup |
| **Embeddings** | Text -> Vector | OpenAI API one line |
| **Streaming APIs (SSE)** | ChatGPT jaisa streaming | Code already hai |

### Level 3: Pro (Scale karne ke liye)
- Reranking, Hybrid Search tuning
- LangSmith tracing
- Kubernetes / Fly.io scaling

## 2. OpenCode Skills (Is Project ko 10x Easy Banane ke liye)

Agar tum `opencode` use kar rahe ho to ye skills add karo `.opencode/skills/` me:

```json
// .opencode/skills/rag-skill.json
{
  "name": "rag-pipeline",
  "description": "Auto chunk, embed, and store any doc",
  "triggers": ["ingest", "upload pdf"],
  "actions": ["call POST /api/documents/upload"]
}
```

**Recommended OpenCode Skills for NexMind:**
1.  `nextjs-shadcn-skill` - UI components generate karna
2.  `fastapi-crud-skill` - API endpoints scaffold
3.  `qdrant-skill` - Vector DB queries
4.  `seo-skill` - Auto meta tags generate
5.  `docker-deploy-skill` - One-click deploy

## 3. Easy Setup Path (15 min me chalu)

### Option A: One-Click (Sabse Easy)
```bash
# 1. Clone
git clone <repo> && cd 01-NexMind-RAG-Assistant

# 2. Env banao - sirf 1 key chahiye
cp .env.example .env
# OPENAI_API_KEY=sk-xxxx daalo

# 3. Chalao
docker-compose up -d
# Done! http://localhost:3000 kholo
```

### Option B: No Docker (Local)
```bash
pip install -r backend/requirements.txt
npm install --prefix frontend
# Qdrant Cloud free URL use karo (no local install)
npm run dev --prefix frontend
uvicorn backend.app.main:app --reload
```

## 4. Learning Path (3 Din Me Expert)
- **Day 1:** Next.js chat UI samjho (2 hr)
- **Day 2:** FastAPI + Qdrant ingestion dekho (2 hr)
- **Day 3:** Prompt + Hybrid search tweak karo aur Product Hunt pe launch karo

## 5. Kaise Relevant Banega (Trending Tips)
1.  README me `RAG`, `LangChain`, `Next.js`, `AI` keywords rakho - GitHub search me upar ayega
2.  Demo video (30 sec) GIF README me lagao - stars 2x badhte hain
3.  `topics:` me `rag`, `chatbot`, `ai`, `vector-database`, `openai` add karo
4.  `opencode` skills file se new contributors 5 min me setup kar payenge

## 6. Common Errors & Fix
- `QDRANT_URL not found` -> `.env` me `QDRANT_URL=:6333` check karo
- `OpenAI rate limit` -> `.env` me `LLM_PROVIDER=ollama` karke local chalao
- `PDF not indexing` -> `backend/logs` me dekho, PyPDF missing ho to `pip install pypdf`

## 7. Next Steps
- Ye skills seekh ke tum 2-3 din me Project 2 (PixelForge) bhi bana loge - same FastAPI + Next.js base reuse hoga.

> Tip: Is project ko apne resume me "Built RAG system handling 10k+ vectors with <2s latency" likho - recruiter magnet hai.
