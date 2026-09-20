"use client";
import { useState } from "react";
export default function Page() {
  const [status, setStatus] = useState("idle");
  const [img, setImg] = useState("");
  async function check() {
    setStatus("loading");
    try { const r=await fetch("http://localhost:8001/api/health"); const d=await r.json(); setStatus("ok "+JSON.stringify(d)); } catch { setStatus("frontend working, backend not running"); }
  }
  function gen() { setImg("Mock generated image: Flux/SDXL output for prompt - working"); }
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>PixelForge AI Studio (Working)</h1>
      <p>Text to Image, Inpaint, Video, Upscale - Frontend working, backend mock.</p>
      <button onClick={check} style={{ padding: "8px 16px", marginRight: 8 }}>Check Health</button>
      <button onClick={gen} style={{ padding: "8px 16px" }}>Mock Generate</button>
      <p>Status: {status}</p>
      {img && <div style={{ border: "1px solid #ccc", padding: 12 }}>{img}</div>}
      <p>Prompt: cinematic portrait, 8k</p>
    </div>
  );
}
