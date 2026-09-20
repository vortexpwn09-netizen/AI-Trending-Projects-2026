from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="AutoFlow API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/api/health")
def health(): return {"status":"working","project":"AutoFlow","engine":"LangGraph"}
@app.post("/api/workflows/generate")
def gen(payload: dict): return {"dag": {"nodes":[{"id":"1","type":"agent","agent":"researcher"}]}}
@app.get("/")
def root(): return {"message":"AutoFlow backend working"}
