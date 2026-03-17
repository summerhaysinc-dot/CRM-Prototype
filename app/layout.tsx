import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Prototype",
  description: "AWS free-tier friendly CRM prototype"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
