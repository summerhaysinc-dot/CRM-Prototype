"use client";
import { useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";

export default function AiPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  return <main><TopNav /><section className="max-w-4xl mx-auto pt-24 px-4 space-y-4"><h1 className="text-2xl font-semibold">Authentic Intelligence</h1>
  <textarea className="w-full border rounded-md px-3 py-2" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ask the AI" />
  <Button disabled={loading} onClick={async()=>{setLoading(true);const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});const data=await res.json();setResponse(data.response);setLoading(false);}}>{loading?'Loading...':'Submit'}</Button>
  {response?<div className="bg-white border rounded-md p-3">{response}</div>:null}
  </section></main>;
}
