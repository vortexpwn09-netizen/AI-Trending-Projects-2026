from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="PixelForge API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/api/health")
def health(): return {"status":"working","project":"PixelForge","model":"flux/sdxl"}
@app.post("/api/generate/text-to-image")
def gen(payload: dict): return {"status":"queued","prediction_id":"mock_123","urls":["https://via.placeholder.com/1024"]}
@app.get("/")
def root(): return {"message":"PixelForge backend working"}
