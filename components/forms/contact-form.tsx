"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
};

const initialState: ContactPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: ""
};

export function ContactForm({
  initial = initialState,
  onSubmit,
  submitLabel
}: {
  initial?: ContactPayload;
  submitLabel: string;
  onSubmit: (payload: ContactPayload) => Promise<void>;
}) {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    if (submitLabel === "Create") setForm(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
      </div>
      <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
      <Button disabled={loading}>{loading ? "Saving..." : submitLabel}</Button>
    </form>
  );
}
