"use client";
import { useEffect, useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";

export default function FlowsPage() {
  const [items, setItems] = useState<{id:string;name:string}[]>([]);
  const [name, setName] = useState("");
  const load = async () => { const res = await fetch("/api/flows"); if (res.ok) setItems(await res.json()); };
  useEffect(()=>{void load();},[]);
  return <main><TopNav /><section className="max-w-5xl mx-auto pt-24 px-4 space-y-4"><h1 className="text-2xl font-semibold">Flows</h1>
    <form className="flex gap-2" onSubmit={async e=>{e.preventDefault();await fetch('/api/flows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})});setName('');await load();}}><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Flow name"/><Button>Create</Button></form>
    {items.map(i=><div key={i.id} className="bg-white border p-3 rounded-md flex justify-between"><span>{i.name}</span><Button className="bg-red-600" onClick={async()=>{await fetch(`/api/flows/${i.id}`,{method:'DELETE'});await load();}}>Delete</Button></div>)}
  </section></main>;
}
