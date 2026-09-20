# PRD - RepoAtlas AI Vault

## 1. Vision
Har codebase ka Obsidian vault 2 minute me. Jaise GitHub repo ka Google Maps ho - har service, DB aur API ka connection dikhe, search karo aur puchho.

## 2. Problem
- Nayi team ko onboarding me 1 hafta lagta hai - docs bikhre hain
- Code change hota hai, vault/docs manual update nahi hota
- Existing tools (CodeSee, Sourcegraph) expensive, Obsidian support nahi
- Freelancers ko client repo ka vault banana padta hai bar bar

## 3. Target Users
| Persona | Pain | Value |
|---|---|---|
| Solo Dev / Indie Hacker | 30 repos hain, kya kahan hai yaad nahi | Ek vault me sab repos searchable |
| Tech Lead | New hire onboarding slow | Auto MOC + graph -> 1 day onboarding |
| Agency (Pragya Limited type) | Har client ka repo alag, docs banana time waste | 2 min vault, client ko share karo |
| Obsidian Power User | Manual vault banana boring | GitHub se auto vault |

## 4. User Stories
- US-01: As user, mai GitHub URL paste karu aur 60 sec me Obsidian vault zip download karu
- US-02: As user, mai puchhu "payment flow kaise kaam karta hai" aur AI 3 files ke reference ke sath answer de
- US-03: As user, mai graph view me dekh saku auth service kis DB table se connected hai
- US-04: As user, local folder select karke bina GitHub ke vault bana saku (private code)
- US-05: As user, daily `git pull` par vault ka daily note auto update ho
- US-06: As user, vault ko Obsidian Showcase/Projects me sync kar saku

## 5. Functional Requirements
### MVP (3 weeks)
- [ ] GitHub URL input + GitHub API clone (shallow) + local folder upload
- [ ] Parser: Tree-sitter (JS/TS/Python/Go) -> file tree, functions, routes, DB models
- [ ] Tech stack detector: package.json, requirements.txt, go.mod, Dockerfile parse
- [ ] Obsidian vault generator: Mustache templates -> markdown with YAML frontmatter, wikilinks [[MOC]]
- [ ] Structure: 00 Home, 03 Projects/{Repo}, 05 Technology/Stack.md, 09 Knowledge/API.md, 09 Knowledge/ER.md
- [ ] Canvas: Architecture.canvas JSON (Obsidian Canvas format) - nodes for services
- [ ] RAG: Chunk code (500 tokens) -> embed bge-small -> Qdrant per repo -> chat API
- [ ] Frontend: Next.js - URL input, progress (SSE), graph preview (React Flow), download zip
- [ ] Daily note: git log --since=1day -> LLM summary -> 12 Daily Notes/YYYY-MM-DD.md

### V1.5
- [ ] ER diagram PNG via Mermaid + API docs OpenAPI 3.1 JSON
- [ ] Incremental sync: git webhook push -> re-index only changed files
- [ ] Obsidian plugin: Vault open in Obsidian directly

### V2.0
- [ ] Team vault merge - 5 repos ka combined vault
- [ ] Export to Notion, Confluence
- [ ] Private mode: Ollama local LLM, Qdrant local, no data leaves device

## 6. Non-Functional
- 10k files repo < 90 sec analysis (parallel parsing)
- Vault markdown valid Obsidian (frontmatter, wikilinks pass Obsidian linter)
- Search latency < 1.5 sec (Qdrant HNSW)
- Private code support - local folder, no GitHub token needed

## 7. Success Metrics
- GitHub stars 12k in 60 days (devtools + obsidian both viral)
- 3k vaults generated first month
- Activation: 55% users generate 2nd vault in 7 days
- Obsidian community plugin installs 1k

## 8. Competitive Analysis
| Tool | Weak | RepoAtlas Edge |
|---|---|---|
| CodeSee | Paid $24/mo, no Obsidian | Free, Obsidian native |
| Sourcegraph | Cody chat only, no vault | Vault + graph + canvas |
| Gource | Visual only, no AI | AI MOC + chat |
| Manual vault | 10 hr manual | 2 min auto |

## 9. Monetization
- Open source self-host free
- Cloud Pro 19 dollar/mo - 100 vaults, team merge, daily sync, private repo support
- Agency plan for Pragya type - white label vault

## 10. Roadmap
- Week 1: GitHub clone + Tree-sitter parser + vault templates
- Week 2: Qdrant RAG + chat + React Flow graph
- Week 3: Daily notes + ER/Mermaid + Docker + polish + launch
