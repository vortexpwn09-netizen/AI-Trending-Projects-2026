"use client";
import { useState } from "react";
export default function Page() {
  const [s,setS]=useState("idle");
  async function check(){ setS("loading"); try{const r=await fetch("http://localhost:8003/api/health"); const d=await r.json(); setS("ok "+JSON.stringify(d));}catch{setS("frontend working, backend not running");}}
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>VoxClone AI - Voice Cloning (Working)</h1>
      <p>30s voice clone, TTS 29 langs - Mock working.</p>
      <button onClick={check} style={{ padding: "8px 16px", marginRight: 8 }}>Check Health</button>
      <button onClick={()=>setS("Mock TTS: Namaste dosto, aaj ka podcast shuru karte hain")} style={{ padding: "8px 16px" }}>Mock TTS</button>
      <p>Status: {s}</p>
    </div>
  );
}
