# CodeSage AI - AI Code Review & Auto-Fix Agent

> GitHub Trending #3 | Your AI Senior Developer | CodeRabbit + Cursor Alternative

CodeSage har PR ka AI code review karta hai - bugs, security, performance, aur auto-fix PR bhi banata hai. Jaise ek senior dev 24/7 tumhara code dekhe.

**GitHub Stars Potential:** 14k+ | **Category:** DevTools, AI Agents, Code AI
**Tech Stack:** Next.js, FastAPI, GitHub App, LangGraph, GPT-4o, Tree-sitter, Docker

### 🔥 Kya Karta Hai?
-  PR kholte hi 30 sec me review comment (bugs + suggestions)
-  Auto-fix: "Fix it" button -> AI commit push kar deta hai
-  Security scan (SQL injection, XSS)
-  Repo Q&A - "Auth kaise kaam karta hai?" -> AI codebase se answer
-  Jira/Linear auto ticket

### 🎯 Demo
```bash
# Developer PR kholta hai
git push origin feature/login
# -> GitHub Action triggers CodeSage
# -> 30 sec me comment:
# "Line 42: SQL injection risk. Fix: use parameterized query. [Auto-fix]"
```

### 🚀 Quick Start
```bash
git clone https://github.com/your-username/codesage.git
cd 03-CodeSage-AI-Agent
pip install -r requirements.txt
npm install --prefix frontend
# .env me GITHUB_APP_ID, OPENAI_API_KEY
python backend/main.py
# Ngrok se webhook expose karo -> GitHub App install karo
```

### 📁 Docs
- `PRD.md` | `TRD.md` | `architecture.md` | `SKILLS.md` | `SEO.md`

### 📈 Trending Kyu Hoga?
- Har developer ko chahiye - TAM bada hai
- GitHub App Marketplace pe list hoga -> stars + installs
- Demo: Comment apne repo pe dikhao - viral proof

MIT | Built for Dev Teams
