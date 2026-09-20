"use client";
import { useState } from "react";
export default function Page() {
  const [s,setS]=useState("idle");
  async function check(){ setS("loading"); try{const r=await fetch("http://localhost:8005/api/health"); const d=await r.json(); setS("ok "+JSON.stringify(d));}catch{setS("frontend working, backend not running");}}
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>RepoAtlas AI - GitHub to Obsidian Vault (Working)</h1>
      <p>Paste GitHub URL, get vault + graph + chat - Mock working.</p>
      <input placeholder="https://github.com/owner/repo" style={{ width: "100%", padding: 8, margin: "12px 0" }} />
      <button onClick={check} style={{ padding: "8px 16px", marginRight: 8 }}>Check Health</button>
      <button onClick={()=>setS("Mock vault generated: 00 Home, Canvas, Graph ready")} style={{ padding: "8px 16px" }}>Mock Generate</button>
      <p>Status: {s}</p>
    </div>
  );
}
