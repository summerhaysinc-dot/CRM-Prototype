"use client";
import { useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";

export default function UserSettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  return <main><TopNav /><section className="max-w-xl mx-auto pt-24 px-4 space-y-3"><h1 className="text-2xl font-semibold">User Settings</h1>
    <input placeholder="First name" value={firstName} onChange={e=>setFirstName(e.target.value)} />
    <input placeholder="Last name" value={lastName} onChange={e=>setLastName(e.target.value)} />
    <input placeholder="New password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
    <Button onClick={async()=>{await fetch('/api/users/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName,lastName,password})});setMessage('Saved');}}>Save</Button>
    {message?<p className="text-green-600">{message}</p>:null}
  </section></main>;
}
