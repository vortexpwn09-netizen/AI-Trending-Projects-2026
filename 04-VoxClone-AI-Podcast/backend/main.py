from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="VoxClone API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/api/health")
def health(): return {"status":"working","project":"VoxClone","model":"XTTS-v2"}
@app.post("/api/tts")
def tts(payload: dict): return {"audio_url":"mock.wav","duration": 3.5}
@app.get("/")
def root(): return {"message":"VoxClone backend working"}
