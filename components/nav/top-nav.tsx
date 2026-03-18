"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/contacts", label: "Contacts" },
  { href: "/conversations", label: "Conversations" },
  { href: "/flows", label: "Flows" },
  { href: "/sequences", label: "Sequences" },
  { href: "/ai", label: "Authentic Intelligence" }
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-40">
      <nav className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4 gap-4">
        <div className="font-bold text-lg">CRM Prototype</div>
        <div className="hidden md:flex items-center gap-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1 rounded-md",
                pathname === item.href ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href="/settings/user" className="text-sm px-3 py-1 border rounded-md">User Settings</Link>
          <Link href="/settings/company" className="text-sm px-3 py-1 border rounded-md">Company Settings</Link>
          <Button onClick={logout}>Logout</Button>
        </div>
      </nav>
    </header>
  );
}
