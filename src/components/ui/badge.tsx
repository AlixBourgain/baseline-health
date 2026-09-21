import { cn } from "@/lib/utils";

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "bad"; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tone === "neutral" && "bg-neutral-100 text-neutral-700", tone === "good" && "bg-emerald-50 text-emerald-700", tone === "warn" && "bg-amber-50 text-amber-800", tone === "bad" && "bg-red-50 text-red-700", className)}>{children}</span>;
}
