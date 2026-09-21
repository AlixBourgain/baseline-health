import Link from "next/link";
import { ArrowRight, FilePlus2, ShieldCheck } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: profile }, { data: reports }, { data: results }] = await Promise.all([
    supabase.from("profiles").select("first_name").eq("id", user.id).maybeSingle(),
    supabase.from("lab_reports").select("id,sample_date,lab_name,status,created_at").order("sample_date", { ascending: false }).limit(4),
    supabase.from("lab_results").select("id,value_numeric,unit_raw,unit_canonical,flag,biomarker_catalog(slug,display_name,category),lab_reports(sample_date)"),
  ]);
  const recentResults = (results ?? []).slice().sort((a: any, b: any) => new Date(b.lab_reports.sample_date).getTime() - new Date(a.lab_reports.sample_date).getTime()).slice(0, 6);

  return <div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm text-neutral-500">Votre espace santé</p><h1 className="mt-1 text-4xl font-semibold tracking-[-.035em]">Bonjour{profile?.first_name ? ` ${profile.first_name}` : ""}.</h1></div><Link href="/blood-tests/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white"><FilePlus2 className="size-4"/>Importer une analyse</Link></div>

    <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
      <Card className="p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm text-neutral-500">Derniers biomarqueurs</p><h2 className="mt-1 text-xl font-semibold">Ce qui a été extrait</h2></div><Link href="/biomarkers" className="text-sm text-neutral-500">Tout voir</Link></div>
        <div className="mt-6 divide-y divide-neutral-100">{recentResults.length ? recentResults.map((result: any) => <div key={result.id} className="flex items-center justify-between py-4"><div><p className="font-medium">{result.biomarker_catalog?.display_name ?? "Biomarqueur"}</p><p className="mt-1 text-xs text-neutral-500">{result.biomarker_catalog?.category}</p></div><div className="text-right"><p className="font-semibold">{result.value_numeric} <span className="text-xs font-normal text-neutral-500">{result.unit_canonical || result.unit_raw}</span></p><Badge className="mt-1" tone={result.flag === "normal" ? "good" : result.flag === "unknown" ? "neutral" : "warn"}>{result.flag === "normal" ? "Dans la référence" : result.flag === "unknown" ? "Référence inconnue" : "À contextualiser"}</Badge></div></div>) : <Empty />}</div>
      </Card>
      <Card className="p-6 sm:p-7"><ShieldCheck className="size-6"/><h2 className="mt-5 text-xl font-semibold">Vos données vous appartiennent</h2><p className="mt-3 text-sm leading-6 text-neutral-600">Vous pouvez télécharger vos données structurées ou supprimer votre compte depuis les réglages.</p><Link href="/settings/privacy" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Contrôles de confidentialité <ArrowRight className="size-4"/></Link></Card>
    </div>

    <Card className="mt-5 p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm text-neutral-500">Historique</p><h2 className="mt-1 text-xl font-semibold">Analyses récentes</h2></div><Link href="/blood-tests" className="text-sm text-neutral-500">Tout voir</Link></div><div className="mt-5 divide-y divide-neutral-100">{reports?.length ? reports.map((report) => <Link key={report.id} href={`/blood-tests/${report.id}`} className="flex items-center justify-between py-4"><div><p className="font-medium">Bilan du {formatDate(report.sample_date)}</p><p className="mt-1 text-xs text-neutral-500">{report.lab_name || "Laboratoire non renseigné"}</p></div><Badge tone={report.status === "ready" ? "good" : report.status === "failed" ? "bad" : "neutral"}>{report.status === "ready" ? "Analysé" : report.status === "failed" ? "À vérifier" : "Traitement"}</Badge></Link>) : <Empty />}</div></Card>
  </div>;
}

function Empty() { return <div className="py-10 text-center text-sm text-neutral-500">Aucune donnée pour le moment.</div>; }
