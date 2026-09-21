import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function BloodTestsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: reports } = await supabase.from("lab_reports").select("id,sample_date,lab_name,original_filename,status,created_at").order("sample_date", { ascending: false });
  return <div className="mx-auto max-w-5xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-neutral-500">Documents</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Prises de sang</h1></div><Link href="/blood-tests/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm text-white"><FilePlus2 className="size-4"/>Importer</Link></div>
    <Card className="mt-8 overflow-hidden"><div className="divide-y divide-neutral-100">{reports?.length ? reports.map((report) => <Link href={`/blood-tests/${report.id}`} key={report.id} className="flex items-center justify-between gap-5 p-5 hover:bg-neutral-50"><div><p className="font-medium">{formatDate(report.sample_date)}</p><p className="mt-1 text-xs text-neutral-500">{report.lab_name || report.original_filename}</p></div><Badge tone={report.status === "ready" ? "good" : report.status === "failed" ? "warn" : "neutral"}>{report.status === "ready" ? "Importée" : report.status === "failed" ? "Vérification requise" : "Traitement"}</Badge></Link>) : <p className="p-10 text-center text-sm text-neutral-500">Importez votre première prise de sang.</p>}</div></Card>
  </div>;
}
