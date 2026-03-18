"use client";
import { useEffect, useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";

export default function CompanySettingsPage() {
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  useEffect(()=>{void (async()=>{const res=await fetch('/api/users/company');if(res.ok){const data=await res.json();setLogo(data.logo||'');}})();},[]);

  return <main><TopNav /><section className="max-w-xl mx-auto pt-24 px-4 space-y-3"><h1 className="text-2xl font-semibold">Company Settings</h1>
    <textarea className="w-full border rounded-md px-3 py-2" placeholder="Paste logo URL or base64 string" value={logo} onChange={e=>setLogo(e.target.value)} />
    <Button onClick={async()=>{await fetch('/api/users/company',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({logo})});setMessage('Logo saved locally');}}>Upload Logo</Button>
    {message?<p className="text-green-600">{message}</p>:null}
  </section></main>;
}
