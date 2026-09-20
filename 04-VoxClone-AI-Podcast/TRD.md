# TRD - VoxClone AI

## 1. Tech Stack
**Frontend:** Next.js 15 + Tailwind + Wavesurfer.js (audio wave) + shadcn
**Backend:** FastAPI + Celery + Redis
**TTS:** Coqui XTTS-v2 (open, multilingual) + ElevenLabs API (fallback premium)
**STT:** Whisper large-v3 (Faster-Whisper)
**Voice Changer:** RVC (Retrieval-based Voice Conversion)
**Audio:** FFmpeg (mux, denoise), pydub
**Storage:** R2/S3 for audio, Postgres
**Queue:** Celery (GPU tasks)

## 2. Architecture
```
[Frontend Upload] -> FastAPI /api/voices/clone -> Save wav to R2 -> Celery `clone_voice`
                                                              |
                                                              ▼
                                                      XTTS GPU Worker
                                                      (extract speaker embedding)
                                                              |
                                                              ▼ Postgres `voices` table

[Frontend TTS] -> POST /api/tts {text, voice_id, language} -> Celery `synthesize` -> XTTS -> wav -> R2 -> SSE back
```

## 3. Data Models
```sql
users (id, email)
voices (id, user_id, name, sample_url, embedding_path, language, created_at)
generations (id, user_id, voice_id, text, audio_url, duration, created_at)
podcasts (id, user_id, script, audio_url, speakers jsonb)
```

## 4. APIs
- `POST /api/voices/clone` (multipart wav) -> {voice_id}
- `GET /api/voices`
- `POST /api/tts` {text, voice_id, speed:1.0, emotion:"happy"} -> {audio_url} (stream or polling)
- `POST /api/transcribe` (audio) -> {text}
- `POST /api/podcast` {script: "S1: Hi\nS2: Hello", voices: {S1: id, S2:id}} -> concatenated audio
- `POST /api/dub` (video) {target_lang} -> dubbed video url

## 5. XTTS Details
- Model: `coqui/XTTS-v2` (2B, supports 17 langs including Hindi)
- Clone needs 30 sec clean audio (16kHz, mono)
- Embedding: `xtts.get_conditioning_latents(audio_path)` -> save `latents.pt`
- Synthesis: `xtts.tts(text, speaker_wav=sample, language="en")`
- GPU: 8GB VRAM, docker `ghcr.io/coqui-ai/xtts`

## 6. Podcast & Dubbing Flow
**Podcast:**
1. Parse script by speaker
2. For each line: TTS with respective voice (parallel)
3. Concat with 0.5s silence via FFmpeg `concat`
4. Upload final mp3 to R2

**Dubbing:**
1. Extract audio FFmpeg -> Whisper transcribe + timestamps
2. Translate via GPT-4o-mini (if lang change)
3. TTS per segment with cloned voice
4. Mux new audio with video (lip-sync optional via Wav2Lip)

## 7. Performance
- XTTS TTS ~ 3s for 20 words on T4 GPU
- Queue: Upstash Redis, concurrency 2 per GPU
- Cache: Same text+voice -> immediate return (hash)

## 8. Security
- Verify audio is voice (not music) via simple VAD
- Rate limit TTS 30/min
- Content filter: block abusive cloning (require consent checkbox)

## 9. DevOps
- Docker: `backend`, `xtts-worker` (GPU), `whisper-worker`, `redis`, `postgres`
- Env: `XTTS_URL, ELEVENLABS_KEY, R2_*, DATABASE_URL`
- Deploy: RunPod / Vast.ai for GPU worker, Vercel frontend, Fly.io backend
- Fallback: If GPU down, route to ElevenLabs API

## 10. Testing
- Unit: text normalize
- Integration: clone -> tts roundtrip
- E2E: Upload -> TTS -> Download check duration

## 11. Risks
- GPU cost high -> Use RunPod spot, batch
- Hindi XTTS quality vs ElevenLabs -> Fine-tune on Hindi dataset (optional)
