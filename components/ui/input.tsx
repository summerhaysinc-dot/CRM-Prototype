import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full", props.className)} />;
}
