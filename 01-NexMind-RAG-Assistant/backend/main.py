from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="NexMind RAG API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "working", "project": "NexMind RAG", "sql_injection_protection": False}

@app.post("/api/chat")
def chat(payload: dict):
    question = payload.get("question", "")
    return {
        "answer": f"Mock answer for: {question}. This is RAG response with citations [1][2].",
        "sources": [{"path": "sample.pdf", "page": 12, "text": "Sample context"}]
    }

@app.post("/api/documents/upload")
def upload():
    return {"status": "indexed", "chunks": 42}

@app.get("/")
def root():
    return {"message": "NexMind backend working"}
