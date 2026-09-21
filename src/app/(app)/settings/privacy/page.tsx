import { Download, Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function PrivacySettingsPage({ searchParams }: { searchParams: Promise<{ consent?: string }> }) {
  const { consent } = await searchParams;
  const supabase = await createClient();
  const { data: events } = await supabase.from("privacy_consents").select("action,version,occurred_at").eq("purpose", "health_data_processing").order("occurred_at", { ascending: false }).limit(1);
  const active = events?.[0]?.action === "granted";

  return <div className="mx-auto max-w-4xl"><p className="text-sm text-neutral-500">Confidentialité</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Vos données, vos choix</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">Ces contrôles automatisent une partie des droits utilisateur. Une adresse de contact dédiée et une procédure interne restent nécessaires en production.</p>
    {consent === "withdrawn" ? <p className="mt-4 rounded-xl bg-neutral-100 p-3 text-sm">Votre consentement santé a été retiré et les données santé actives ont été supprimées.</p> : null}
    {consent === "granted" ? <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">Votre consentement santé est de nouveau actif.</p> : null}
    {consent === "required" ? <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Un consentement santé actif et à jour est requis pour importer de nouveaux documents.</p> : null}

    <Card className="mt-8 flex items-center justify-between gap-4 p-5"><div className="flex items-center gap-3">{active ? <ShieldCheck className="size-5 text-emerald-700"/> : <ShieldOff className="size-5 text-neutral-500"/>}<div><p className="font-medium">Traitement des données de santé</p><p className="mt-1 text-xs text-neutral-500">{active ? `Consentement actif · version ${events?.[0]?.version}` : "Consentement retiré"}</p></div></div></Card>

    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <Card className="p-6"><Download className="size-6"/><h2 className="mt-5 text-lg font-semibold">Exporter mes données</h2><p className="mt-2 text-sm leading-6 text-neutral-600">Télécharge les données structurées de votre compte au format JSON.</p><a className="mt-6 inline-flex h-10 items-center rounded-full border border-neutral-200 px-4 text-sm font-medium" href="/api/account/export">Télécharger mon export</a></Card>
      <Card className="p-6"><Trash2 className="size-6"/><h2 className="mt-5 text-lg font-semibold">Supprimer mon compte</h2><p className="mt-2 text-sm leading-6 text-neutral-600">Supprime le compte, les résultats structurés et les documents stockés. Les sauvegardes techniques suivent la politique de rétention du prestataire.</p><Modal trigger={<button className="mt-6 inline-flex h-10 items-center rounded-full bg-red-600 px-4 text-sm font-medium text-white">Supprimer mon compte</button>} title="Suppression définitive" description="Cette action ne peut pas être annulée."><form method="post" action="/api/account/delete" className="space-y-4"><label className="block text-sm font-medium">Tapez SUPPRIMER pour confirmer<input name="confirmation" className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3" pattern="SUPPRIMER" required /></label><Button variant="danger" className="w-full" type="submit">Supprimer définitivement</Button></form></Modal></Card>
      {active ? <Card className="p-6"><h2 className="text-lg font-semibold">Retirer mon consentement santé</h2><p className="mt-2 text-sm leading-6 text-neutral-600">Retire le consentement et supprime les documents et résultats actifs, sans supprimer votre compte.</p><Modal trigger={<button className="mt-6 inline-flex h-10 items-center rounded-full border border-neutral-200 px-4 text-sm font-medium">Retirer le consentement</button>} title="Retirer le consentement santé" description="Vos documents de santé et résultats structurés seront supprimés."><form method="post" action="/api/account/withdraw-health-consent"><Button variant="danger" className="w-full" type="submit">Confirmer le retrait</Button></form></Modal></Card> : <Card className="p-6"><h2 className="text-lg font-semibold">Réactiver le traitement santé</h2><p className="mt-2 text-sm leading-6 text-neutral-600">Vous pouvez consentir à nouveau au traitement nécessaire pour importer et comparer vos analyses.</p><form method="post" action="/api/account/grant-health-consent" className="mt-6"><Button variant="secondary" type="submit">Je consens à nouveau</Button></form></Card>}
    </div>
  </div>;
}
