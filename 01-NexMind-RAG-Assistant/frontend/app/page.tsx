"use client";
import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("idle");
  const [answer, setAnswer] = useState("");

  async function checkHealth() {
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:8000/api/health");
      const data = await res.json();
      setStatus("ok: " + JSON.stringify(data));
    } catch (e) {
      setStatus("backend not running, but frontend working");
    }
  }

  async function mockChat() {
    setAnswer("Mock RAG answer: NexMind is working. Upload PDF and ask questions with citations.");
  }

  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>NexMind - RAG Assistant (Working)</h1>
      <p>Chat with PDFs, YouTube and Docs. Frontend working, backend mock ready.</p>
      <button onClick={checkHealth} style={{ padding: "8px 16px", marginRight: 8 }}>Check Backend Health</button>
      <button onClick={mockChat} style={{ padding: "8px 16px" }}>Mock Chat</button>
      <p>Status: {status}</p>
      {answer && <div style={{ border: "1px solid #ccc", padding: 12, marginTop: 12 }}>{answer}</div>}
      <ul>
        <li>Upload PDF (mock)</li>
        <li>Ask question (mock streaming)</li>
        <li>Citations with page numbers</li>
      </ul>
    </div>
  );
}
