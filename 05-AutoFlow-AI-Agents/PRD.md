# PRD - AutoFlow AI Agents

## 1. Vision
Har insan apna AI workforce bana sake - bina code ke, sirf bolke. Zapier ka AI-native successor.

## 2. Problem
- Zapier/n8n me har node manually connect karna padta hai, AI nahi
- AutoGPT autonomous hai par unreliable, no UI
- Business logon ko daily repetitive tasks karne padte hain (research, posting, emails)

## 3. Users
| Persona | Pain | Value |
|---|---|---|
| **Founder** | Daily research + content | 1 prompt -> auto blog+tweet |
| **Marketer** | Lead scraping + email | Auto lead gen workflow |
| **Dev** | API glue code | Agents write code & run |
| **Student** | Assignments | Research agent |

## 4. Stories
- US1: As user, mai bolu "YouTube se top videos nikal aur summary notion me daal" aur ho jaye
- US2: As user, visual builder me drag-drop se workflow bana saku
- US3: As user, agent ka live log dekh saku (kya soch raha hai)
- US4: As user, 100+ integrations connect kar saku (OAuth)
- US5: As user, workflow ko schedule karu (cron) ya webhook se trigger

## 5. Requirements
### MVP
- [ ] Chat to Workflow: Natural language -> LangGraph generates DAG
- [ ] 5 Core Agents: Researcher (Tavily), Writer (GPT-4o), Browser (Playwright), Coder (GPT-4o + E2B sandbox), Messenger (Slack/Gmail)
- [ ] Visual Builder: React Flow drag-drop (n8n style)
- [ ] Execution Engine: Inngest + LangGraph run with live logs (SSE)
- [ ] Templates: 10 ready workflows (YouTube->Blog, Gmail->Notion, etc.)
- [ ] OAuth: Google, Notion, Slack, GitHub

### V1.5
- [ ] Self-healing: Failure -> LLM fix & retry
- [ ] Human-in-the-loop: Approval node
- [ ] Marketplace: Share workflows

### V2.0
- [ ] Voice trigger ("Hey AutoFlow, do X")
- [ ] Team workspaces, usage billing (Stripe)
- [ ] Fine-tuned small model for cost

## 6. Non-Functional
- Workflow execution < 3 min for 5-step
- Support 500 concurrent workflows
- Reliability 99% (retry + fallback)

## 7. Metrics
- Stars 15k+ (agents viral)
- 5k workflows created in 30 days
- Activation: 60% users run 2nd workflow in 3 days

## 8. Competitors
| Tool | Weak | Edge |
|---|---|---|
| Zapier | No AI, manual | AI generates workflow |
| n8n | Dev-focused, no agents | Natural language + agents |
| AutoGPT | No UI, loop fails | Visual + reliable + integrations |

## 9. Monetization
- Free self-host, Cloud Pro $29/mo 1000 runs, Enterprise

## 10. Roadmap
- W1: LangGraph agents + Inngest
- W2: Visual builder + OAuth
- W3: Templates + Launch
