# Architecture | PixelForge AI Studio

## 1. High-Level Diagram
```
┌─────────────────────────────────────────────┐
│           Next.js 15 Frontend               │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ │
│  │ Prompt   │ │ Canvas   │ │ Gallery    │ │
│  │ Bar      │ │ Inpaint  │ │ Masonry    │ │
│  └────┬─────┘ └────┬─────┘ └─────┬──────┘ │
│       └────────────┼─────────────┘        │
└────────────────────┼──────────────────────┘
                     │ fetch /api/generate
                     ▼
┌─────────────────────────────────────────────┐
│         Next.js API Routes (Node)           │
│  - /api/generate/*  (Replicate/Fal wrapper) │
│  - /api/webhook     (async completion)      │
│  - /api/enhance     (GPT prompt booster)    │
└──────────┬──────────────────────┬───────────┘
           │                      │
     ┌─────▼──────┐         ┌─────▼──────┐
     │ Replicate  │         │   Fal.ai   │
     │ SDXL/Flux  │         │ Flux Schnell│
     │ SVD Video  │         │ AnimateDiff │
     └─────┬──────┘         └─────┬──────┘
           └──────────┬───────────┘
                      ▼
              ┌──────────────┐
              │ Cloudflare R2│
              │ (Images)     │
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │ Postgres     │
              │ generations  │
              └──────────────┘
```

## 2. Frontend Details
- **Pages:** `/` (studio), `/gallery`, `/train-lora`, `/api-docs`
- **Components:** `PromptInput` (textarea + enhance button), `ModelSelector` (SDXL/Flux), `ImageGrid`, `InpaintCanvas` (Fabric.js)
- **State:** Zustand `useGenerationStore` + SWR for polling
- **Realtime:** `EventSource` for webhook SSE, fallback polling every 3s

## 3. Backend Details
- **No separate backend** - Next.js API routes enough (saves cost)
- **Queue:** For video (30s+) use QStash delayed webhook, for image direct await
- **Webhook Handler:** Verifies `Replicate-Signature`, downloads output, uploads to R2 (presigned), updates DB

## 4. Storage Flow
1. Replicate generates temp URL (expires 1h)
2. Backend fetches -> Uploads to R2 `pixelforge/{user_id}/{gen_id}.png`
3. Frontend loads from R2 CDN `https://cdn.pixelforge.r2.dev/...`
4. Postgres stores R2 URL array

## 5. Scalability
- Vercel auto scales API routes
- R2 unlimited storage, $0.015/GB
- Add Redis cache for prompt history

## 6. Local Mode Architecture (Optional)
```
[Frontend] -> [Local ComfyUI API :8188] -> GPU
```
- Docker compose: `comfyui` service with models volume
- Switch via env `GENERATION_PROVIDER=local`

## 7. Security
- Clerk middleware protects `/api/generate/*`
- Check credits atomically (`UPDATE users SET credits = credits -1 WHERE credits >0`)
- Webhook secret validation

## 8. Monitoring
- Vercel logs + Sentry
- Track avg generation time per model in Posthog

## 9. Future
- WebGPU client-side SDXL via `transformers.js` (offline)
- Plugin for Figma
