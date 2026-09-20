"use client";
import { useState } from "react";
export default function Page() {
  const [s,setS]=useState("idle");
  async function check(){ setS("loading"); try{const r=await fetch("http://localhost:8004/api/health"); const d=await r.json(); setS("ok "+JSON.stringify(d));}catch{setS("frontend working, backend not running");}}
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>AutoFlow AI - Workflow Automation (Working)</h1>
      <p>Chat to workflow, agents do work - Mock working.</p>
      <button onClick={check} style={{ padding: "8px 16px", marginRight: 8 }}>Check Health</button>
      <button onClick={()=>setS("Mock workflow: Researcher -> Writer -> Publisher done")} style={{ padding: "8px 16px" }}>Mock Run</button>
      <p>Status: {s}</p>
    </div>
  );
}
