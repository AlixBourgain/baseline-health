import Link from "next/link";
import { Activity, Bot, FileText, LayoutDashboard, Settings } from "lucide-react";
import { Logo } from "@/components/logo";
import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/dashboard", label: "Accueil", icon: LayoutDashboard },
  { href: "/blood-tests", label: "Analyses", icon: FileText },
  { href: "/biomarkers", label: "Biomarqueurs", icon: Activity },
  { href: "/assistant", label: "Assistant", icon: Bot },
  { href: "/settings", label: "Réglages", icon: Settings },
];

export function AppShell({ children, email }: { children: React.ReactNode; email?: string | null }) {
  return (
    <div className="min-h-screen bg-[#f6f7f5] lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-neutral-200 bg-white px-5 py-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <Logo />
        <nav className="mt-8 flex gap-1 overflow-x-auto lg:flex-col">
          {nav.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"><Icon className="size-4"/>{label}</Link>)}
        </nav>
        <div className="mt-6 border-t border-neutral-200 pt-5 lg:absolute lg:bottom-5 lg:left-5 lg:right-5">
          <p className="truncate text-xs text-neutral-500">{email}</p>
          <form action={logout} className="mt-3"><Button type="submit" variant="secondary" size="sm" className="w-full">Se déconnecter</Button></form>
        </div>
      </aside>
      <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
