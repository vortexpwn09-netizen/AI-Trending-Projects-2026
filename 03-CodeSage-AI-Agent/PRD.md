# PRD - CodeSage AI Agent

## 1. Vision
Har dev team ka AI senior reviewer jo har PR ko 30 sec me review kare, insecure code pakde, aur fix bhi kar de.

## 2. Problem
- Code review me 2-4 ghante lagte hain, senior busy
- Bugs production me jaate hain, security misses
- Existing tools (SonarQube) rules-based, context nahi samajhte

## 3. Users
| Persona | Pain | Value |
|---|---|---|
| **Solo Indie Hacker** | Koi reviewer nahi | AI reviewer |
| **Startup CTO** | Review bottleneck | 10x faster merges |
| **Open Source Maintainer** | 50 PRs/day | Auto triage + review |

## 4. User Stories
- US1: As dev, PR khulte hi mujhe line-by-line comments milen
- US2: As dev, mai "Auto-fix" click karu aur AI fix commit kar de
- US3: As CTO, dashboard pe dekhu kaunsi repo me sabse zyada bugs
- US4: As dev, puchhu "Is repo me auth kaise implement hai?" aur AI answer de
- US5: As dev, VS Code extension se file save par review mile

## 5. Requirements
### MVP
- [ ] GitHub App (webhook: pull_request.opened, synchronized)
- [ ] Diff parser -> Chunked by file -> LLM review
- [ ] Comment via GitHub API (review comments)
- [ ] Dashboard (Next.js) - list repos, PRs, reviews
- [ ] Repo Q&A chat (RAG over codebase via Tree-sitter + embeddings)

### V1.5
- [ ] Auto-fix branch + commit
- [ ] Security rules (OWASP top 10)
- [ ] VS Code extension
- [ ] Slack/Discord bot

### V2.0
- [ ] Jira auto ticket + Fix PR
- [ ] Team analytics, custom rules
- [ ] GitLab/Bitbucket support

## 6. Non-Functional
- Review latency < 45s for 500 line PR
- Support 100 concurrent PRs
- No code stored > 7 days (privacy)

## 7. Success Metrics
- GitHub Marketplace installs 2k in 30 days
- Stars 8k in 60 days (devtools viral)
- Avg review time 30s vs human 4h

## 8. Competitors
| Tool | Weak | Edge |
|---|---|---|
| CodeRabbit | Closed, $15/dev | Open source, self-host |
| Codium PR-Agent | CLI only | Beautiful dashboard + auto-fix |
| SonarQube | No AI context | LLM understands intent |

## 9. Monetization
- Free for OSS + 20 PRs/mo, Pro $19/dev/mo unlimited + auto-fix
- Self-host free

## 10. Roadmap
- W1: GitHub App + diff -> LLM -> comment
- W2: Dashboard + RAG Q&A
- W3: Auto-fix + Launch
