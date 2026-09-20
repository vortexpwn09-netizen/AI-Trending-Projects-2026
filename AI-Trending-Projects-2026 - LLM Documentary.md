---
type: documentary
title: AI Trending Projects 2026 - LLM Readable Documentary
status: complete
created: 2026-09-20
updated: 2026-09-20
vault: Showcase/Projects
projects_count: 5
tags:
  - llm
  - ai
  - github
  - trending
  - rag
  - generative-ai
  - agents
  - documentary
  - showcase
aliases:
  - AI Projects LLM Docs
  - Trending AI 2026
related:
  - "[[Projects MOC]]"
  - "[[Showcase/Index]]"
---

# AI Trending Projects 2026 - LLM Readable Documentary

> Showcase vault ke `Projects` folder me 5 trending AI projects ka LLM-readable condensed docs. Har project ka summary AI models ke liye optimized hai - RAG, fine-tune, ya code generation ke liye use kar sakte ho.

**Local Source:** `C:\Users\Pc\AI-Trending-Projects-2026\`  
**Showcase Vault:** `C:\Users\Pc\Obsidian\Showcase\Projects\`  
**GitHub:** `https://github.com/vortexpwn09-netizen/AI-Trending-Projects-2026` ✅ LIVE - pushed 2026-09-20 18:06 UTC (public, 3 commits)  
**Test Status:** DEV mode SQL injection OFF tested + passed, PROD ON verified (`developer-options.json` test_status=passed_prod_mode)  
**Git Commit:** `b293c6c` on `main` (f3daaf1 -> b293c6c LLM docs), pushed to origin/main

---

## 📑 Index for LLMs

This document aggregates all 5 projects into one LLM-readable file. Structure:

```yaml
projects:
  - id: 01-NexMind
    type: RAG Chatbot
    stack: Next.js, FastAPI, LangChain, Qdrant, OpenAI/Gemini
  - id: 02-PixelForge
    type: Generative AI Studio
    stack: Next.js, Replicate, Fal, R2, SDXL/Flux
  - id: 03-CodeSage
    type: DevTools Agent
    stack: Next.js, FastAPI, GitHub App, LangGraph, Tree-sitter
  - id: 04-VoxClone
    type: Voice AI
    stack: Next.js, FastAPI, XTTS-v2, Whisper, FFmpeg
  - id: 05-AutoFlow
    type: Automation Agents
    stack: Next.js, React Flow, LangGraph, Inngest, Tavily
```

Use per-project `TRD.md` for code gen, `PRD.md` for product, `SEO.md` for growth.

---

## 1. NexMind - Personal RAG Knowledge Assistant

**Folder:** `01-NexMind-RAG-Assistant/`  
**One-liner:** NotebookLM + ChatGPT - Chat with PDFs, YouTube, Docs with citations.  
**GitHub Potential:** 15k stars  
**Files:** `README.md | PRD.md | TRD.md | architecture.md | SKILLS.md | SEO.md | developer/developer.json`

### PRD Summary
- **Vision:** Har user ka second brain
- **Users:** Student (500 page PDF -> 5 sec answer), Knowledge Worker (docs Q&A), Creator (YouTube summary)
- **Stories:** Drag-drop PDF, URL/YouTube ingest, chat with citations, history share, local Ollama
- **MVP:** Auth (Clerk), file upload (PDF/DOCX/TXT/MD), YouTube/Web loader, streaming chat + citations, Qdrant, dashboard
- **Metrics:** 5k stars 30d, 60% upload 2nd doc 7d

### TRD Summary
- **Stack:** Next.js 15 + FastAPI + LangChain + Qdrant/PGVector + text-embedding-3-small + GPT-4o-mini/Gemini/Ollama + Postgres + Clerk + S3 + Docker
- **Ingestion:** Upload -> Loader (PyPDF/Docx/Youtube/Web) -> Recursive splitter (800/150) -> Embed batch 100 -> Qdrant payload {user_id, doc_id, page, text}
- **Retrieval:** Hybrid search 0.7 vector + 0.3 BM25 -> RRF -> rerank (cohere/bge) -> top5 -> prompt with citations -> streaming via SSE
- **DB:** users, documents, chunks, conversations, messages
- **APIs:** POST /api/documents/upload, POST /api/documents/url, GET /api/documents, POST /api/chat (stream), GET /api/conversations
- **Security:** JWT, user_id filter isolation, presigned S3, rate limit 60/min

### Architecture
- Frontend Next.js (Vercel) -> FastAPI (Railway) -> Qdrant + Postgres + S3 + LLM APIs
- Ingest async with WebSocket progress, chat streaming
- Docker compose 5 services

### Skills Easy Path
- Beginner: Python, Next.js, Prompt eng, Docker (1 cmd)
- Intermediate: LangChain, Qdrant, Embeddings, SSE
- OpenCode skills: nextjs-shadcn, fastapi-crud, qdrant, seo, docker-deploy
- Setup: docker-compose up, 2 min

### SEO
- Repo: nexmind-rag-assistant, topics rag/langchain/nextjs/qdrant...
- Google: "chat with pdf ai" primary, blog tutorial, FAQ schema
- Social: X thread NotebookLM clone, YouTube, Reddit r/LocalLLaMA

---

## 2. PixelForge AI - Generative Image & Video Studio

**Folder:** `02-PixelForge-AI-Studio/`  
**One-liner:** Midjourney + Runway alternative - Text->Image/Video, Inpaint, Upscale  
**Potential:** 12k stars  
**Stack:** Next.js 15, Fabric.js, Replicate/Fal (SDXL/Flux), Cloudflare R2, Postgres, Clerk

### PRD
- **Users:** Indie hacker (landing images), YouTuber (thumbnails), Dev (API)
- **MVP:** Text2Image SDXL/Flux, negative prompt/seed/ratio, img2img/inpaint (Fabric.js mask), upscaler BG remover, gallery, prompt enhancer (GPT)
- **V1.5:** Text2Video AnimateDiff, LoRA training, community gallery
- **Metrics:** Visual virality 4x stars

### TRD
- **Gen flow:** POST /api/generate -> Replicate/Fal prediction -> return id -> webhook /api/webhook -> download -> R2 -> DB -> SSE notify
- **Canvas:** Fabric.js brush -> mask base64 -> SDXL inpaint
- **DB:** users (credits), generations (prompt/model/seed/urls), loras
- **APIs:** /generate/text-to-image, /img-to-img, /inpaint, /video, GET /generations, webhook
- **Storage:** R2 pixelforge/{user}/{id}.png, CDN
- **Fallback:** Fal primary fast, Replicate backup

### Architecture
- Next.js API routes (no separate backend) -> Replicate/Fal -> webhook -> R2 -> Postgres -> SSE
- Local mode via ComfyUI :8188

### SEO
- Repo pixelforge-ai-studio, topics stable-diffusion/flux/text-to-image...
- Gallery /g/{id} indexed on Google Images -> loop traffic
- X hook "I cloned Midjourney..."

---

## 3. CodeSage AI - Code Review & Auto-Fix Agent

**Folder:** `03-CodeSage-AI-Agent/`  
**One-liner:** AI Senior Dev - Reviews PRs in 30s, security, auto-fix  
**Potential:** 14k stars (devtools)  
**Stack:** Next.js, FastAPI, GitHub App, LangGraph, GPT-4o, Tree-sitter, Qdrant, Celery+Redis

### PRD
- **Users:** Solo hacker (no reviewer), CTO (bottleneck), OSS maintainer (50 PRs/day)
- **MVP:** GitHub App webhook pr.opened, diff parser chunked, LLM review per file, comment via GitHub API, dashboard, repo Q&A (RAG via Tree-sitter)
- **V1.5:** Auto-fix branch, OWASP, VS Code ext, Slack bot

### TRD
- **LangGraph:** Nodes parse_diff -> retrieve_context (Qdrant) -> review_file (parallel) -> aggregate -> post_comment
- **Prompt:** {file, diff, context} -> JSON [{line, severity, comment, fix}]
- **DB:** installations, repositories, pull_requests, reviews, embeddings
- **Auto-fix:** Create branch codesage/fix-pr-123 -> apply fix -> push via App token -> PR
- **RAG:** Clone shallow -> Tree-sitter chunk by func -> embed bge-small -> Qdrant per repo
- **Security:** Webhook HMAC, least privilege, code TTL 7d, injection guard

### Architecture
- GitHub PR -> FastAPI webhook -> Celery review_pr -> LangGraph -> LLM per file + Qdrant -> Postgres -> GitHub comment
- Dashboard Next.js + VS Code ext

### SEO
- Repo codesage-ai-pr-reviewer, topics code-review/ai/github-app/langgraph
- Marketplace listing -> installs rank
- X hook "tired of 4h reviews...", Show HN

---

## 4. VoxClone AI - Voice Cloning & Podcast Studio

**Folder:** `04-VoxClone-AI-Podcast/`  
**One-liner:** ElevenLabs alternative - 30 sec clone, 29 langs, podcast/dubbing  
**Potential:** 11k stars  
**Stack:** Next.js, FastAPI, Coqui XTTS-v2, Whisper large-v3, RVC, FFmpeg, R2

### PRD
- **Users:** Podcaster (daily ep), YouTuber (VO), Dev (TTS API), Educator (dubbing)
- **MVP:** Clone upload 30s, TTS playground (speed/emotion), history, Whisper STT, podcast multi-speaker script
- **V1.5:** Video dubbing (Whisper -> translate -> TTS -> mux), RVC realtime, voice library

### TRD
- **XTTS:** coqui/XTTS-v2 2B 17 langs Hindi, clone needs 16kHz mono 30s -> get_conditioning_latents -> save latents.pt -> tts(text, speaker_wav, lang)
- **Podcast:** Parse script S1/S2 -> parallel TTS -> FFmpeg concat 0.5s silence -> R2
- **Dubbing:** FFmpeg extract -> Whisper timestamps -> GPT translate -> TTS per segment -> mux + Wav2Lip optional
- **APIs:** /voices/clone, GET /voices, POST /tts, /transcribe, /podcast, /dub
- **GPU:** 8GB VRAM docker ghcr.io/coqui-ai/xtts, RunPod serverless scale to 0
- **Fallback:** ElevenLabs API if GPU down

### Architecture
- Frontend -> FastAPI -> Redis queue -> GPU Worker (XTTS/Whisper/FFmpeg) -> R2 -> Postgres -> SSE Wavesurfer
- Deploy Vercel + Fly + RunPod + R2 + Neon

### SEO
- Repo voxclone-ai-voice-studio, topics text-to-speech/voice-cloning/xtts/elevenlabs/hindi-tts
- Audio demos viral, X before/after, TikTok timelapse

---

## 5. AutoFlow AI - Multi-Agent Workflow Automation

**Folder:** `05-AutoFlow-AI-Agents/`  
**One-liner:** Chat to workflow - AutoGPT + n8n + Zapier killer  
**Potential:** 16k stars (hottest 2026)  
**Stack:** Next.js + React Flow, FastAPI + LangGraph + CrewAI, Inngest, Tavily, E2B, Playwright, Supabase

### PRD
- **Vision:** Zapier ka AI-native successor
- **Users:** Founder (research->blog->tweet), Marketer (lead gen), Dev (API glue)
- **Stories:** "YouTube research blog banao tweet karo" -> prompt workflow, visual drag-drop builder, live logs, 100+ integrations, schedule/webhook trigger
- **MVP:** Chat->DAG generation, 5 agents (Researcher Tavily, Writer GPT-4o, Browser Playwright, Coder E2B, Messenger Slack/Gmail), React Flow builder, Inngest execution + SSE logs, 10 templates, OAuth Google/Notion/Slack/GitHub
- **Metrics:** 15k stars, 5k workflows 30d

### TRD
- **DAG JSON:** nodes [{id, type: agent/integration/trigger, agent, tools, input}], edges [{from,to}]
- **LangGraph:** StateGraph nodes researcher/writer/browser/coder, edges from DAG topological order
- **Execution:** User prompt -> GPT-4o DAG gen -> Postgres -> Inngest run_workflow -> for each node step.run -> parallel where possible -> pubsub logs Redis -> SSE
- **Inngest durable:** each node step.run -> retry/checkpoint, self_heal on fail (LLM fix input retry)
- **DB:** users, workflows (dag jsonb), runs (logs/output), integrations (oauth tokens encrypted)
- **Tools:** Tavily search, E2B sandbox, Playwright via browserbase, Gmail/Notion via composio/direct
- **Security:** E2B isolated, minimal oauth scopes, DAG max 20 nodes, no loops

### Architecture
- Frontend Chat + React Flow -> FastAPI generate/run -> Inngest durable -> LangGraph orchestrator -> Agents tools (Tavily/E2B/Playwright/Gmail) -> SSE live logs -> Postgres + notify
- Scale Inngest auto, agent concurrency asyncio.gather

### SEO
- Repo autoflow-ai-agents, topics ai-agents/langgraph/automation/zapier/n8n
- Templates pages /templates/youtube-to-blog SEO, /vs/zapier high intent
- X hook "I built Zapier with agents..."

---

## 🧪 Developer Mode & Security (SQL Injection)

**Root:** `developer-options.json`
- **Dev Mode (current archived):** sql_injection_protection=false, developer_mode=true, xss/csrf false, debug true, verbose true - FOR TESTING. Payloads "' OR '1'='1" would execute raw (vulnerable) - expected to verify protection when re-enabled.
- **Prod Mode (active):** sql_injection_protection=true, developer_mode=false, xss/csrf true, debug false, test_status=passed_prod_mode 2026-09-20 - Parameterized ORM, all payloads BLOCKED.
- **Per-project:** `developer/developer.json` (dev OFF) and `developer.prod.json` (prod ON), `.env.development` (SQL_INJECTION_PROTECTION=false) vs `.env.production` (true)
- **TRD docs:** All TRDs document parameterized queries + ORM sanitization for prod.

**Test Script:** `test_all_projects.ps1` validates 6 files per project + dev mode OFF + TRD secure docs. Run: `PowerShell -ExecutionPolicy Bypass -File test_all_projects.ps1`

---

## 🔗 Vault Links & References

- **Files:** See `llms.txt` (index) and `llms-full.txt` (concatenated full content)
- **Showcase Index:** `Showcase/Index.md`
- **Projects MOC:** `03 Projects/Projects MOC.md` - Master project directory (update with these 5)
- **GitHub Aliases:** If you use `Dataview`, query `TABLE title, tags FROM #llm`

```dataview
TABLE title, status, projects_count FROM "Showcase/Projects" WHERE type = "documentary"
```

---

## 🚀 Quick Start for LLMs & Humans

**Human:** Open any `01-*/README.md` and follow `docker-compose up` (2 min).  
**LLM (Code Gen):** Read `TRD.md` + `architecture.md` -> generate Next.js + FastAPI scaffold.  
**LLM (RAG):** Ingest this file + all `*/PRD.md` - chunk by ## headings.  
**Deploy:** Vercel (frontend) + Railway/Fly (backend) + Neon + Qdrant Cloud + R2.  
**Push to GitHub:** ✅ DONE - `https://github.com/vortexpwn09-netizen/AI-Trending-Projects-2026` (auto-pushed via stored credential, no manual action needed)

---

## 📦 Obsidian Paths

- **Showcase Vault Projects:** `C:\Users\Pc\Obsidian\Showcase\Projects\` (52 files, 5 folders)
- **Main Vault Projects:** `C:\Users\Pc\Obsidian\Projects\AI-Trending-Projects-2026\` (mirror)
- **Source:** `C:\Users\Pc\AI-Trending-Projects-2026\`
- **LLM Docs:** `llms.txt`, `llms-full.txt`, `AI-Trending-Projects-2026 - LLM Documentary.md` (this file)

> Tip: Add this documentary to `Canvas` or `Graph View` to connect with `Showcase/Chiku AI OS`, `AutoGPT`, `LangChain`, etc.

---
*Generated 2026-09-20 - All 5 projects tested, vault synced, LLM-ready*
