"use client";

import { useEffect, useMemo, useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { ContactForm, type ContactPayload } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Contact = ContactPayload & { id: string };

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Contact | null>(null);

  async function loadContacts() {
    const res = await fetch("/api/contacts");
    if (res.ok) setContacts(await res.json());
  }

  useEffect(() => {
    void loadContacts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts.filter((c) => `${c.firstName} ${c.lastName} ${c.email} ${c.company}`.toLowerCase().includes(q));
  }, [contacts, search]);

  async function createContact(payload: ContactPayload) {
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    await loadContacts();
  }

  async function updateContact(payload: ContactPayload) {
    if (!editing) return;
    await fetch(`/api/contacts/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setEditing(null);
    await loadContacts();
  }

  async function removeContact(id: string) {
    if (!confirm("Delete this contact?")) return;
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    await loadContacts();
  }

  return (
    <main>
      <TopNav />
      <section className="max-w-6xl mx-auto pt-24 px-4 space-y-6">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <div className="bg-white p-4 rounded-lg border space-y-4">
          <h2 className="font-semibold">{editing ? "Edit Contact" : "Create Contact"}</h2>
          <ContactForm initial={editing ?? undefined} submitLabel={editing ? "Update" : "Create"} onSubmit={editing ? updateContact : createContact} />
          {editing ? <Button className="bg-slate-200 text-slate-900" onClick={() => setEditing(null)}>Cancel</Button> : null}
        </div>

        <div className="bg-white p-4 rounded-lg border space-y-3">
          <Input placeholder="Search contacts" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact) => (
                  <tr key={contact.id} className="border-b">
                    <td className="py-2">{contact.firstName} {contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.company}</td>
                    <td className="space-x-2">
                      <Button className="bg-slate-700" onClick={() => setEditing(contact)}>Edit</Button>
                      <Button className="bg-red-600" onClick={() => removeContact(contact.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
