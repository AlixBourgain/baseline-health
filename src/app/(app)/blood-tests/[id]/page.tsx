import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { updateSampleDate, upsertManualResult } from "./actions";
import { Button } from "@/components/ui/button";

export default async function BloodTestDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: report } = await supabase.from("lab_reports").select("id,sample_date,lab_name,original_filename,status,storage_path").eq("id", id).maybeSingle();
  if (!report) notFound();

  const [{ data: results }, { data: catalog }] = await Promise.all([
    supabase.from("lab_results").select("id,value_numeric,unit_raw,unit_canonical,reference_low,reference_high,flag,biomarker_catalog(slug,display_name,category)").eq("report_id", id).order("created_at"),
    supabase.from("biomarker_catalog").select("slug,display_name,canonical_unit").order("display_name"),
  ]);

  const signed = report.storage_path ? await supabase.storage.from("health-documents").createSignedUrl(report.storage_path, 60) : null;
  const needsSampleDate = !report.sample_date;

  return <div className="mx-auto max-w-5xl">
    <Link href="/blood-tests" className="inline-flex items-center gap-2 text-sm text-neutral-500"><ArrowLeft className="size-4"/>Analyses</Link>

    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm text-neutral-500">{report.lab_name || "Prise de sang"}</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight">{formatDate(report.sample_date)}</h1>
      </div>
      {signed?.data?.signedUrl ? <a href={signed.data.signedUrl} className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-sm"><Download className="size-4"/>PDF original</a> : null}
    </div>

    {error ? <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{error}</p> : null}

    {needsSampleDate ? <Card className="mt-5 border-amber-200 bg-amber-50 p-5">
      <h2 className="font-semibold text-amber-950">Date de prélèvement à confirmer</h2>
      <p className="mt-1 text-sm leading-6 text-amber-900">Baseline n’a pas trouvé de date suffisamment fiable dans ce PDF. Renseignez uniquement la date du prélèvement indiquée sur le compte rendu.</p>
      <form action={updateSampleDate} className="mt-4 flex flex-wrap items-end gap-3">
        <input type="hidden" name="reportId" value={report.id}/>
        <label className="text-xs font-medium text-amber-950">Date du prélèvement
          <input name="sampleDate" type="date" required className="mt-1 h-11 rounded-xl border border-amber-200 bg-white px-3 text-sm text-neutral-950"/>
        </label>
        <Button type="submit">Confirmer la date</Button>
      </form>
    </Card> : null}

    {report.status === "needs_review" && !needsSampleDate && !results?.length ? <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Le PDF a bien été stocké, mais l'extraction automatique n'a pas identifié de valeurs fiables. Une saisie manuelle ou un moteur d'extraction plus avancé devra compléter ce cas.</p> : null}

    <Card className="mt-8 overflow-hidden">
      <div className="border-b border-neutral-100 p-5">
        <h2 className="font-semibold">Résultats extraits</h2>
        <p className="mt-1 text-xs text-neutral-500">Toujours vérifier avec le compte rendu original : l'extraction automatique peut se tromper.</p>
      </div>
      <div className="divide-y divide-neutral-100">{results?.length ? results.map((r: any) => <Link href={`/biomarkers/${r.biomarker_catalog?.slug}`} key={r.id} className="grid grid-cols-[1fr_auto] items-center gap-4 p-5 hover:bg-neutral-50">
        <div>
          <p className="font-medium">{r.biomarker_catalog?.display_name}</p>
          <p className="mt-1 text-xs text-neutral-500">{r.biomarker_catalog?.category}{r.reference_low != null || r.reference_high != null ? ` · référence ${r.reference_low ?? ""}–${r.reference_high ?? ""}` : ""}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{r.value_numeric} <span className="text-xs font-normal text-neutral-500">{r.unit_canonical || r.unit_raw}</span></p>
          <Badge className="mt-1" tone={r.flag === "normal" ? "good" : r.flag === "unknown" ? "neutral" : "warn"}>{r.flag}</Badge>
        </div>
      </Link>) : <p className="p-10 text-center text-sm text-neutral-500">Aucun biomarqueur détecté automatiquement.</p>}</div>
    </Card>

    <Card className="mt-5 p-6">
      <h2 className="font-semibold">Ajouter ou corriger une valeur</h2>
      <p className="mt-1 text-xs leading-5 text-neutral-500">Utilisez le PDF original comme source. Une saisie manuelle remplace la valeur automatique du même biomarqueur pour cette analyse.</p>
      <form action={upsertManualResult} className="mt-5 grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="reportId" value={report.id}/>
        <label className="text-xs font-medium text-neutral-600">Biomarqueur<select name="biomarkerSlug" className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm" required>{(catalog ?? []).map((b) => <option key={b.slug} value={b.slug}>{b.display_name}</option>)}</select></label>
        <label className="text-xs font-medium text-neutral-600">Valeur<input name="value" type="number" step="any" className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm" required/></label>
        <label className="text-xs font-medium text-neutral-600">Unité<input name="unit" className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm" placeholder="mg/L, G/L…" required/></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-neutral-600">Réf. min<input name="referenceLow" type="number" step="any" className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm"/></label>
          <label className="text-xs font-medium text-neutral-600">Réf. max<input name="referenceHigh" type="number" step="any" className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm"/></label>
        </div>
        <div className="sm:col-span-2"><Button type="submit" variant="secondary">Enregistrer la valeur</Button></div>
      </form>
    </Card>
  </div>;
}
