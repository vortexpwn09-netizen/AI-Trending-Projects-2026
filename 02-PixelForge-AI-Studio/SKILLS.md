# SKILLS.md | PixelForge - Skills & Easy Setup

## 1. Required Skills

| Skill | Level | Use |
|---|---|---|
| **Next.js + Tailwind** | Beginner | UI |
| **Replicate / Fal API** | Beginner | 5 lines me image gen |
| **Fabric.js / Canvas** | Intermediate | Inpainting mask |
| **S3 / R2 Storage** | Beginner | Image save |
| **Stripe (optional)** | Intermediate | Credits |

**Tumhe Diffusion Theory seekhne ki zarurat nahi** - APIs handle karengi.

## 2. OpenCode Skills for PixelForge
```json
{
  "skills": [
    "replicate-skill - auto call sdxl/flux",
    "fal-skill - faster generation",
    "canvas-skill - Fabric.js mask helper",
    "r2-upload-skill - upload to R2",
    "prompt-enhancer-skill - GPT se prompt improve"
  ]
}
```

## 3. Easy Setup (5 min)
```bash
cd 02-PixelForge-AI-Studio
npm install
cp .env.example .env
# REPLICATE_API_TOKEN=r8_xxx  (replicate.com/account -> free $5)
# FAL_KEY=xxx (fal.ai -> free credits)
# DATABASE_URL= postgres neon free
# R2_* -> Cloudflare R2 free 10GB
npm run dev
```

**Bina GPU ke chalega** - Replicate/Fal cloud GPU deta hai.

**Local Free (No API cost):**
```bash
docker-compose up comfyui  # 8GB VRAM needed
# .env me GENERATION_PROVIDER=local
```

## 4. Learning Path (2 Days)
- Day1: Replicate docs 15 min + Next.js gallery UI
- Day2: Canvas inpainting tutorial (YouTube 20 min)

## 5. Trending Tips
- README me before/after images GIF lagao - stars 4x
- Topics: `stable-diffusion`, `flux`, `ai-art`, `text-to-image`, `generative-ai`

## 6. Common Fixes
- `Replicate 402` -> Billing add karo, free tier khatam
- `CORS error` -> R2 CORS enable karo
- `Mask not working` -> Canvas export size 1024x1024 rakho

## 7. Reuse from Project 1
- Auth (Clerk), DB (Neon), Deployment (Vercel) same hai - copy paste
