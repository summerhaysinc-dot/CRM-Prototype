import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50", className)}
      {...props}
    />
  );
}
