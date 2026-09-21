import Link from "next/link";
import { ChevronRight, LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireUser();
  return <div className="mx-auto max-w-4xl"><p className="text-sm text-neutral-500">Compte</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Réglages</h1><Card className="mt-8 overflow-hidden"><div className="p-5"><p className="text-sm text-neutral-500">E-mail</p><p className="mt-1 font-medium">{user.email}</p></div><Link href="/settings/privacy" className="flex items-center justify-between border-t border-neutral-100 p-5 hover:bg-neutral-50"><div className="flex items-center gap-3"><LockKeyhole className="size-5"/><div><p className="font-medium">Données & confidentialité</p><p className="mt-1 text-xs text-neutral-500">Exporter ou supprimer vos données.</p></div></div><ChevronRight className="size-4 text-neutral-400"/></Link></Card></div>;
}
