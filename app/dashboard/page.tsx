import { TopNav } from "@/components/nav/top-nav";

export default function DashboardPage() {
  return (
    <main>
      <TopNav />
      <section className="max-w-6xl mx-auto pt-24 px-4">
        <h1 className="text-2xl font-semibold">Welcome to CRM Prototype</h1>
        <p className="text-slate-600 mt-2">Use the navigation to manage contacts, conversations, flows, sequences, and AI prompts.</p>
      </section>
    </main>
  );
}
