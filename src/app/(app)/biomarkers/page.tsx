import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { latestResultsByBiomarker } from "@/lib/health/result-selection";

export default async function BiomarkersPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("lab_results").select("id,value_numeric,unit_raw,unit_canonical,created_at,biomarker_catalog(slug,display_name,category),lab_reports(sample_date,lab_name,created_at,extraction_version)");
  const latest = latestResultsByBiomarker(data ?? []);

  return <div className="mx-auto max-w-5xl"><p className="text-sm text-neutral-500">Historique</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Biomarqueurs</h1><p className="mt-3 text-sm text-neutral-600">Chaque biomarqueur regroupe les valeurs retrouvées dans vos différentes analyses.</p><Card className="mt-8 overflow-hidden"><div className="divide-y divide-neutral-100">{latest.length ? latest.map((row: any) => <Link key={row.biomarker_catalog.slug} href={`/biomarkers/${row.biomarker_catalog.slug}`} className="flex items-center justify-between p-5 hover:bg-neutral-50"><div><p className="font-medium">{row.biomarker_catalog.display_name}</p><p className="mt-1 text-xs text-neutral-500">{row.biomarker_catalog.category}</p></div><p className="font-semibold">{row.value_numeric} <span className="text-xs font-normal text-neutral-500">{row.unit_canonical || row.unit_raw}</span></p></Link>) : <p className="p-10 text-center text-sm text-neutral-500">Aucune donnée pour le moment.</p>}</div></Card></div>;
}
