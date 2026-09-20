# PRD - VoxClone AI Podcast Studio

## 1. Vision
Har creator apni voice se unlimited content bana sake - bina mic ke, bina studio ke. 30 sec sample -> lifetime voice.

## 2. Problem
- ElevenLabs mehenga, Hindi voice quality kharab
- Podcast editing me 5 ghante lagte hain
- Dubbing ke liye alag tool, TTS ke liye alag

## 3. Users
| Persona | Need | Hook |
|---|---|---|
| **Podcaster** | Daily episode | Script -> Audio in 1 min |
| **YouTuber** | Voice over | Apni clone voice se VO |
| **Dev** | App me TTS | API cheap |
| **Educator** | Hindi/English courses | Dubbing |

## 4. Stories
- US1: As user, 30 sec sample upload karu aur clone bane
- US2: As user, text likhu aur apni awaz me sunu
- US3: As user, 2 voices se podcast script generate karu (GPT -> TTS)
- US4: As user, video upload karke uski dubbing karu
- US5: As user, API se apne app me TTS add karu

## 5. Requirements
### MVP
- [ ] Voice clone upload (mp3/wav, 30 sec min, denoise)
- [ ] TTS playground (text, voice select, speed, emotion)
- [ ] History + Download (mp3/wav)
- [ ] Whisper transcription (audio -> text)
- [ ] Podcast mode: Script with `Speaker 1: ... Speaker 2: ...`

### V1.5
- [ ] Video dubbing (extract audio -> Whisper -> Translate -> TTS -> mux)
- [ ] Voice changer RVC real-time
- [ ] Voice library (public voices)

### V2.0
- [ ] API + Credits (Stripe)
- [ ] Mobile app, Chrome extension
- [ ] Emotion + cloning fine-tune

## 6. Non-Functional
- Clone < 2 min (GPU), TTS < 4s for 100 words
- Support 100 concurrent TTS (queue)
- Audio quality 24kHz

## 7. Metrics
- Stars 10k in 60 days (audio demos viral)
- 3k voices cloned in month 1
- Retention: 50% generate 2nd time in 7d

## 8. Competitors
| Tool | Weak | Edge |
|---|---|---|
| ElevenLabs | $22/mo, no self-host | Free, Hindi better via XTTS |
| Coqui Studio | Complex | 1-click UI |
| Murf | Closed | Open source |

## 9. Monetization
- Free self-host, Hosted $15/mo 500 mins, API $0.05/min

## 10. Roadmap
- W1: XTTS clone + TTS
- W2: Podcast + Whisper
- W3: Dubbing + Launch
