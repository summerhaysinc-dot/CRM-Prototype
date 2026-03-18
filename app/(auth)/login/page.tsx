"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginErrorResponse = {
  error?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@crm.local");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      let res: Response;

      try {
        res = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password })
        });
      } catch (fetchError) {
        console.error("Login fetch failed", fetchError);
        setError("Could not reach the server. Make sure `npm run dev` is running and try again.");
        return;
      }

      if (!res.ok) {
        let message = "Invalid email or password";

        try {
          const data = (await res.json()) as LoginErrorResponse;
          if (data?.error) {
            message = data.error;
          }
        } catch {
          // Ignore JSON parsing errors and keep fallback message.
        }

        setError(message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (unexpectedError) {
      console.error("Unexpected login error", unexpectedError);
      setError("Unexpected error while signing in. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error ? <p className="text-red-600 text-sm">{error}</p> : null}
          <Button className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
