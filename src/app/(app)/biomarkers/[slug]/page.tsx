import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/health/trend-chart";
import { formatDate } from "@/lib/utils";
import { dedupeBiomarkerHistory } from "@/lib/health/result-selection";

export default async function BiomarkerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: biomarker } = await supabase.from("biomarker_catalog").select("id,slug,display_name,category,canonical_unit").eq("slug", slug).maybeSingle();
  if (!biomarker) notFound();

  const { data: rawResults } = await supabase.from("lab_results").select("id,value_numeric,unit_raw,unit_canonical,reference_low,reference_high,flag,created_at,lab_reports(sample_date,lab_name,created_at,extraction_version)").eq("biomarker_id", biomarker.id);
  const results = dedupeBiomarkerHistory(rawResults ?? []);
  const comparable = results.filter((r: any) => r.unit_canonical === biomarker.canonical_unit);
  const chartData = comparable.map((r: any) => ({ date: new Intl.DateTimeFormat("fr-FR", { month: "short", year: "2-digit" }).format(new Date(r.lab_reports.sample_date)), value: Number(r.value_numeric) }));
  const annual = new Map<number, any>();
  for (const row of comparable as any[]) annual.set(new Date(row.lab_reports.sample_date).getFullYear(), row);
  const annualRows = [...annual.entries()].sort((a,b) => a[0]-b[0]).map(([year,row], i, arr) => { const prev = i ? Number(arr[i-1][1].value_numeric) : null; const current = Number(row.value_numeric); return { year, value: current, delta: prev && prev !== 0 ? ((current-prev)/prev)*100 : null }; });
  const latest = results.at(-1) as any;
  const latestComparable = comparable.at(-1) as any;

  return <div className="mx-auto max-w-5xl"><p className="text-sm text-neutral-500">{biomarker.category}</p><div className="mt-1 flex flex-wrap items-end justify-between gap-4"><h1 className="text-4xl font-semibold tracking-tight">{biomarker.display_name}</h1>{latest ? <p className="text-3xl font-semibold">{latest.value_numeric} <span className="text-sm font-normal text-neutral-500">{latest.unit_canonical || latest.unit_raw}</span></p> : null}</div>
    <Card className="mt-8 p-6 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-neutral-500">Historique longitudinal</p><h2 className="mt-1 text-xl font-semibold">Évolution dans le temps</h2></div>{latestComparable?.reference_low != null || latestComparable?.reference_high != null ? <p className="text-xs text-neutral-500">Zone teintée = référence du dernier laboratoire</p> : null}</div><div className="mt-5"><TrendChart data={chartData} unit={biomarker.canonical_unit} referenceLow={latestComparable?.reference_low ?? null} referenceHigh={latestComparable?.reference_high ?? null}/></div></Card>
    {annualRows.length ? <Card className="mt-5 p-6"><h2 className="text-sm font-medium">Comparatif année par année</h2><p className="mt-1 text-xs text-neutral-500">La dernière mesure comparable de chaque année est utilisée.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{annualRows.map((row) => <div key={row.year} className="rounded-2xl bg-neutral-50 p-4"><p className="text-xs text-neutral-500">{row.year}</p><p className="mt-2 text-xl font-semibold">{row.value} <span className="text-xs font-normal text-neutral-500">{biomarker.canonical_unit}</span></p><p className="mt-1 text-xs text-neutral-500">{row.delta == null ? "Première mesure" : `${row.delta > 0 ? "+" : ""}${row.delta.toFixed(1)} % vs année précédente`}</p></div>)}</div></Card> : null}
    <Card className="mt-5 overflow-hidden"><div className="border-b border-neutral-100 p-5"><h2 className="font-semibold">Historique complet</h2></div><div className="divide-y divide-neutral-100">{results.slice().reverse().map((r: any) => <div key={r.id} className="flex items-center justify-between p-5"><div><p className="font-medium">{formatDate(r.lab_reports.sample_date)}</p><p className="mt-1 text-xs text-neutral-500">{r.lab_reports.lab_name || "Laboratoire"}</p></div><p className="font-semibold">{r.value_numeric} <span className="text-xs font-normal text-neutral-500">{r.unit_canonical || r.unit_raw}</span></p></div>)}</div></Card>
    <p className="mt-5 text-xs leading-5 text-neutral-500">Cette vue organise vos résultats et ne constitue pas un diagnostic. Les intervalles de référence peuvent varier entre laboratoires, méthodes et situations cliniques.</p>
  </div>;
}
