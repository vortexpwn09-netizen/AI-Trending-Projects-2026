# PRD - Product Requirements Document | NexMind RAG Assistant

## 1. Executive Summary
**Product Name:** NexMind  
**Vision:** Har user ka personal AI knowledge brain jo kisi bhi document pe expert ki tarah answer de.  
**Goal:** GitHub pe 10k+ stars, Product Hunt #1, aur developers ke liye go-to RAG boilerplate banna.

## 2. Problem Statement
- Logon ke paas 100s PDFs, notes, videos hain par search karna mushkil hai.
- ChatGPT me file upload limit hai aur data privacy ka issue hai.
- Existing RAG tools complex hain, non-technical user use nahi kar pata.

## 3. Target Audience
| Persona | Pain Point | Value Prop |
|---|---|---|
| **Student (18-24)** | Exam se pehle 500 page book padhni hai | 5 sec me answer + quiz generation |
| **Knowledge Worker (25-40)** | Client docs, contracts me info dhundhna | Citation ke sath exact answer |
| **Creator/Researcher** | 10 YouTube videos ka research | Auto summary + Q&A |

## 4. User Stories (MVP)
- US-01: As a user, mai PDF drag-drop kar saku aur 10 sec me indexed dekhu
- US-02: As a user, mai puchhu "Is doc me pricing kya hai?" aur source ke sath answer mile
- US-03: As a user, mai YouTube link paste karu aur us video se chat kar saku
- US-04: As a user, mai chat history save aur share kar saku
- US-05: As a user, mai local Ollama model se bina API key ke chat kar saku

## 5. Functional Requirements
### MVP (V1.0 - 3 weeks)
- [ ] Auth (Clerk/Supabase Auth)
- [ ] File Upload: PDF, DOCX, TXT, MD (max 50MB/file, 100 files/user)
- [ ] URL scraper + YouTube transcript ingestion
- [ ] Chat UI (like ChatGPT) with streaming + citations
- [ ] Vector DB: Qdrant (cloud) ya PGVector (self-host)
- [ ] Dashboard: All documents, delete, re-index

### V1.5 (Growth)
- [ ] Chrome Extension - Kisi bhi webpage ko NexMind me save
- [ ] Mind Map auto-generation
- [ ] Quiz & Flashcards generation
- [ ] Multi-collection (e.g., "Office Docs", "Study Material")

### V2.0 (Monetization)
- [ ] Team Workspaces
- [ ] API Access for developers
- [ ] Paywall: Free 50 queries/mo, Pro $9/mo unlimited

## 6. Non-Functional Requirements
- Response time < 2.5s (p95)
- Upload to indexed < 15s for 100 page PDF
- 99.5% uptime
- Privacy: User data encrypted, no training on user data

## 7. Success Metrics (KPIs)
- GitHub Stars: 5k in 30 days, 15k in 90 days
- User Activation: 60% users upload 2nd doc within 7 days
- Retention: DAU/WAU > 30%
- NPS > 50

## 8. Competitive Analysis
| Tool | Weakness | NexMind Edge |
|---|---|---|
| NotebookLM | Google lock-in, limited file types | Open source, local LLM |
| ChatPDF | No YouTube, no citations | YouTube + Hybrid search |
| PrivateGPT | Dev-only, no UI | Beautiful UI + One-click deploy |

## 9. Monetization
- Freemium + Open Source Sponsors + Hosted Cloud version

## 10. Roadmap
- Week 1: Backend RAG pipeline + Qdrant
- Week 2: Frontend chat + upload
- Week 3: Polish, SEO, Deploy, Launch on Product Hunt / X / Reddit
