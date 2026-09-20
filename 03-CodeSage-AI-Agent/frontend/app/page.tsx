"use client";
import { useState } from "react";
export default function Page() {
  const [s,setS]=useState("idle");
  async function check(){ setS("loading"); try{const r=await fetch("http://localhost:8002/api/health"); const d=await r.json(); setS("ok "+JSON.stringify(d));}catch{setS("frontend working, backend not running");}}
  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>CodeSage AI - Code Review Agent (Working)</h1>
      <p>PR review in 30s, security scan, auto-fix - Mock working.</p>
      <button onClick={check} style={{ padding: "8px 16px" }}>Check Health</button>
      <p>Status: {s}</p>
      <pre style={{ background: "#f5f5f5", padding: 12 }}>Mock Review: Line 42 SQL injection risk - suggestion: use parameterized query</pre>
    </div>
  );
}
