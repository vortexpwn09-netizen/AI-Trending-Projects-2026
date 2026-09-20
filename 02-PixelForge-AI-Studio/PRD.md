# PRD - PixelForge AI Studio

## 1. Vision
Har creator ke liye ek all-in-one AI studio jahan text se image, video, editing sab ho - bina Photoshop ya Midjourney subscription ke.

## 2. Problem
- Midjourney Discord pe messy hai, Runway mehenga hai ($15/mo)
- Har tool alag hai - image ke liye ek, video ke liye dusra
- Developers ke liye open-source boilerplate nahi hai jo Replicate/Fal ko wrap kare

## 3. Target Users
| Persona | Need | Hook |
|---|---|---|
| **Indie Hacker** | Landing page images | 10 sec me hero image |
| **YouTuber/Designer** | Thumbnails, reels | Prompt -> Thumbnail in 5 sec |
| **Developer** | AI image feature apne app me add karna | API ready, copy-paste code |

## 4. User Stories (MVP)
- US1: As user, mai prompt likhu "logo for chai startup, minimal" aur 4 options milen
- US2: As user, mai image upload karke "background hata do" kar saku
- US3: As user, mai image ko video me convert karu (animate)
- US4: As user, mai apni images ka history dekhu aur re-prompt kar saku
- US5: As user, mai apna LoRA train karu 10 images se

## 5. Functional Requirements
### MVP (2-3 weeks)
- [ ] Text-to-Image: SDXL + Flux (via Replicate/Fal)
- [ ] Negative prompt, seed, aspect ratio controls
- [ ] Image-to-Image, Inpainting (canvas mask)
- [ ] Upscaler + BG Remover
- [ ] Gallery + Download + Share link
- [ ] Prompt enhancer (GPT se prompt ko better banana)

### V1.5
- [ ] Text-to-Video (AnimateDiff via Fal)
- [ ] LoRA training UI
- [ ] Community gallery (like Midjourney explore)

### V2.0
- [ ] API + SDK (developers ke liye)
- [ ] Team workspaces + Credits system (Stripe)
- [ ] Mobile app (Expo)

## 6. Non-Functional
- Image generation < 8s (Fal) , <15s (Replicate)
- Support 4 concurrent generations per user
- Store images on S3/R2 (Cloudflare R2 cheap)

## 7. Success Metrics
- GitHub 10k stars in 60 days (visual projects viral hote hain)
- 5k image generations in first month (Product Hunt)
- Retention: 40% users generate 2nd time in 3 days

## 8. Competitors
| Tool | Weakness | PixelForge Edge |
|---|---|---|
| Midjourney | Discord only, $10/mo | Web UI, free self-host |
| Leonardo | Closed source | Open source + API |
| ComfyUI | Complex nodes | Simple 1-click UI |

## 9. Monetization
- Open source free (self-host) + Hosted Pro $12/mo (1000 credits)
- Affiliate: Replicate/Fal referral

## 10. Roadmap
- Week1: Replicate wrapper + gallery
- Week2: Canvas inpainting + video
- Week3: Polish + Launch
