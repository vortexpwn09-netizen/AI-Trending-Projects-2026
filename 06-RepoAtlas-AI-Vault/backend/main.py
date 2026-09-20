from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="RepoAtlas API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/api/health")
def health(): return {"status":"working","project":"RepoAtlas","parser":"Tree-sitter"}
@app.post("/api/vault/create")
def create(payload: dict): return {"vault_id":"mock_123","status":"parsing"}
@app.get("/")
def root(): return {"message":"RepoAtlas backend working"}
