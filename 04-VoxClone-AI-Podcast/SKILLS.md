# SKILLS.md | VoxClone - Skills & Easy Path

## 1. Skills

| Skill | Level | Notes |
|---|---|---|
| **Next.js + Audio UI** | Beginner | Wavesurfer easy |
| **FastAPI + Celery** | Beginner | Same as before |
| **Coqui XTTS** | Intermediate | Docker me ready, 2 commands |
| **Whisper** | Beginner | 1 line transcribe |
| **FFmpeg** | Beginner | Concat/mux, copy-paste |

**Audio ML theory not needed** - models pretrained.

## 2. OpenCode Skills
```
- xtts-skill - clone + tts
- whisper-skill - transcribe
- ffmpeg-skill - audio concat
- r2-audio-skill - upload wav
```

## 3. Easy Setup
```bash
cd 04-VoxClone-AI-Podcast
docker-compose up -d  # XTTS + Redis
pip install -r backend/requirements.txt
npm install --prefix frontend
cp .env.example .env
# No ElevenLabs needed for local - XTTS free
# R2_* , DATABASE_URL
npm run dev
# Upload 30 sec sample -> TTS
```

**No GPU?**
- Use ElevenLabs API mode: `TTS_PROVIDER=elevenlabs` -> no GPU needed, free tier 10 mins

## 4. Learning Path (2 Days)
- Day1: XTTS docs 20 min + FastAPI upload
- Day2: Podcast concat + Whisper

## 5. Trending Tips
- Topics: `text-to-speech`, `voice-cloning`, `xtts`, `whisper`, `ai-voice`, `podcast`, `elevenlabs-alternative`
- README me audio samples embed karo (GitHub supports audio? Use HuggingFace spaces link)
- Demo: Clone your voice + tweet audio -> viral

## 6. Fixes
- `CUDA out of memory` -> Use `xtts_cpu` docker or ElevenLabs fallback
- `FFmpeg not found` -> `apt install ffmpeg`
- `WAV too short` -> Need 30 sec, guide user

## 7. Reuse
- Auth, DB, R2 from earlier projects
