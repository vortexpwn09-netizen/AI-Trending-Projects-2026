# TRD - PixelForge AI Studio

## 1. Tech Stack
**Frontend:** Next.js 15 + Tailwind + shadcn + Fabric.js (canvas for inpainting)
**Backend:** Next.js API Routes (no separate server needed) + Replicate SDK + Fal SDK
**Image Gen:** Replicate `sdxl`, `flux-1.1-pro`, Fal `flux/schnell`
**Video:** Fal `animate-diff`, Replicate `stable-video-diffusion`
**Storage:** Cloudflare R2 / S3 + Postgres (Neon) for metadata
**Queue:** Upstash QStash + Redis (for long generations)
**Auth:** Clerk
**Payment:** Stripe credits

## 2. Architecture
```
[Browser - Canvas] -> Next.js API /api/generate
                           |
                    ┌──────┴──────┐
                    ▼             ▼
              Replicate API   Fal.ai API
                    |             |
                    └──────┬──────┘
                           ▼
                    Webhook -> /api/webhook (save to R2 + Postgres)
                           |
                    Pusher / SSE -> Frontend gallery update
```

**Alternative Local Mode:**
```
Docker -> ComfyUI / AUTOMATIC1111 API -> Same frontend
```

## 3. Data Models
```sql
users (id, email, credits)
generations (id, user_id, prompt, negative_prompt, model, seed, width, height, status, r2_urls jsonb, created_at)
loras (id, user_id, name, status, replicate_model_url)
```

## 4. API Design
- `POST /api/generate/text-to-image` {prompt, model: "flux", width:1024, height:1024, seed}
- `POST /api/generate/img-to-img` {image_url, prompt, strength:0.7}
- `POST /api/generate/inpaint` {image_url, mask_base64, prompt}
- `POST /api/generate/video` {image_url, prompt}
- `GET /api/generations` -> list
- `POST /api/webhook/replicate` -> handle completion

## 5. Key Implementation Details
### Generation Flow
1. Frontend POST -> Backend validates credits -> Calls Replicate `client.predictions.create()`
2. Return `prediction_id` immediately -> Frontend polling / webhook wait
3. Replicate webhook hits `/api/webhook` -> Download image -> Upload to R2 -> Save DB -> Notify frontend via SSE
4. Frontend shows skeleton -> real image

### Canvas Inpainting
- Fabric.js overlay on image -> User brush mask -> Export mask as PNG base64 -> Send to SDXL inpaint API

### Prompt Enhancer
```js
// Call GPT-4o-mini to enhance
"Enhance this prompt for SDXL: {userPrompt} -> detailed, cinematic, 8k"
```

## 6. Performance
- Use Fal for speed (2x faster than Replicate) - primary, Replicate fallback
- CDN: R2 + Cloudflare cache
- Image optimization: Next.js `next/image` with R2 loader

## 7. Security & Limits
- Credits check before generate (1 image = 1 credit, video = 5 credits)
- NSFW filter: Replicate auto + extra `nsfwjs` check
- Rate limit: 10 gen/min per user

## 8. DevOps
- `docker-compose` for local SDXL (optional, needs 16GB VRAM)
- Env: `REPLICATE_TOKEN, FAL_KEY, R2_*, DATABASE_URL`
- Deploy: Vercel (frontend+API) + R2

## 9. Testing
- Mock Replicate in tests
- E2E: Generate -> Wait -> Check gallery

## 10. Cost Calc
- 1000 images via Fal flux schnell = $20
- Charge user $12 for 1000 credits -> margin if volume

## 11. Risks
- Replicate down -> Fallback to Fal automatic retry
- Cold start -> Keep warm via cron ping
