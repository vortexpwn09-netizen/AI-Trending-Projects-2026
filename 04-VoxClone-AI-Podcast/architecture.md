# Architecture | VoxClone AI

## 1. Diagram
```
┌─────────────────────────────────┐
│ Next.js Frontend                │
│ ┌──────────┐ ┌───────────────┐ │
│ │ Clone    │ │ TTS Playground│ │
│ │ Upload   │ │ Podcast Studio│ │
│ └────┬─────┘ └──────┬────────┘ │
└──────┼──────────────┼───────────┘
       │              │ /api/*
       ▼              ▼
┌─────────────────────────────────┐
│ FastAPI (Vercel/Fly)            │
│ - /api/voices/*                 │
│ - /api/tts, /api/podcast        │
└──────┬──────────────────────────┘
       │ Celery enqueue
       ▼
┌─────────────────────────────────┐
│ Redis Queue                     │
└──────┬──────────────────────────┘
       ▼
┌─────────────────────────────────┐      ┌──────────┐
│ GPU Worker (RunPod)             │─────►│   R2     │
│ - XTTS-v2 (clone+tts)           │      │  Audio   │
│ - Whisper (transcribe)          │◄─────┤  Storage │
│ - FFmpeg (concat/mux)           │      └────┬─────┘
└─────────────────────────────────┘           │
                                              ▼
                                       ┌──────────┐
                                       │ Postgres │
                                       │ voices   │
                                       └──────────┘
       ▲
       │ Webhook / Polling
┌──────┴──────────┐
│ Frontend SSE    │ -> Wavesurfer playback
└─────────────────┘
```

## 2. Frontend
- **Pages:** `/` (studio), `/voices`, `/podcast`, `/dub`, `/api-docs`
- **Components:** `VoiceUploader` (wave preview), `TTSBox` (text + voice select + play), `PodcastEditor` (speaker blocks), `AudioPlayer` (Wavesurfer)
- **State:** Zustand, playback via Howler.js

## 3. GPU Worker
- **Docker Image:** `python:3.11` + `TTS==0.22`, `faster-whisper`, `ffmpeg`
- **Endpoints (internal):** `POST /clone`, `POST /tts` (called by backend via private network)
- **Scaling:** Auto-scale RunPod serverless (scale to 0 when idle)

## 4. Storage
- R2 path: `voxclone/{user_id}/{generation_id}.wav`
- Serve via CDN with `Content-Disposition`

## 5. Fallback
- If GPU queue > 30s, offer ElevenLabs fast path (if user has key)
- Circuit breaker: after 3 fails, switch

## 6. Security
- Voice consent: User must tick "I own this voice"
- Watermark: Add inaudible watermark to cloned audio (optional)

## 7. Deployment
- Frontend Vercel, Backend Fly.io, GPU RunPod, R2, Neon Postgres
- Env: `GPU_WORKER_URL` (private)

## 8. Monitoring
- Track GPU utilization, queue length (Grafana)
- Sentry, Posthog for TTS latency

## 9. Future
- Real-time voice changer via WebRTC + RVC
- Lip-sync dubbing via Wav2Lip
