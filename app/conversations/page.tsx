"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";

type Contact = { id: string; firstName: string; lastName: string };
type Conversation = { id: string; contactId: string; message: string; direction: "inbound" | "outbound"; contact: Contact };

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactId, setContactId] = useState("");
  const [message, setMessage] = useState("");
  const [direction, setDirection] = useState<"inbound" | "outbound">("outbound");

  async function load() {
    const [convRes, contactRes] = await Promise.all([fetch("/api/conversations"), fetch("/api/contacts")]);
    if (convRes.ok) setConversations(await convRes.json());
    if (contactRes.ok) {
      const all = await contactRes.json();
      setContacts(all);
      if (all[0] && !contactId) setContactId(all[0].id);
    }
  }

  useEffect(() => { void load(); }, []);

  async function addMessage(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contactId, message, direction }) });
    setMessage("");
    await load();
  }

  return <main><TopNav /><section className="max-w-6xl mx-auto pt-24 px-4 space-y-4"><h1 className="text-2xl font-semibold">Conversations</h1>
    <form onSubmit={addMessage} className="bg-white border rounded-lg p-4 space-y-3">
      <select value={contactId} onChange={(e)=>setContactId(e.target.value)} className="w-full">{contacts.map(c=><option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}</select>
      <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full border rounded-md px-3 py-2" placeholder="Message" required />
      <select value={direction} onChange={(e)=>setDirection(e.target.value as "inbound"|"outbound")}><option value="inbound">Inbound</option><option value="outbound">Outbound</option></select>
      <Button>Add message</Button>
    </form>
    <div className="space-y-2">{conversations.map(c=><div key={c.id} className="bg-white border rounded-md p-3"><p className="text-sm text-slate-500">{c.contact.firstName} {c.contact.lastName} · {c.direction}</p><p>{c.message}</p></div>)}</div>
  </section></main>;
}
