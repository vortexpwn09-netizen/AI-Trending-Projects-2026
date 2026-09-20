from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="CodeSage API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/api/health")
def health(): return {"status":"working","project":"CodeSage","agent":"LangGraph"}
@app.post("/webhook/github")
def webhook(payload: dict): return {"status":"review queued","comments": [{"line":42,"severity":"critical","comment":"SQL injection risk"}]}
@app.get("/")
def root(): return {"message":"CodeSage backend working"}
