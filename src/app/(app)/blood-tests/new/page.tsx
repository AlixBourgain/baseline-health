import Link from "next/link";
import { ArrowLeft, FileUp, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadBloodTest } from "./actions";

export default async function NewBloodTestPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <div className="mx-auto max-w-3xl"><Link href="/blood-tests" className="inline-flex items-center gap-2 text-sm text-neutral-500"><ArrowLeft className="size-4"/>Analyses</Link><h1 className="mt-5 text-4xl font-semibold tracking-tight">Importer une prise de sang</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">Le PDF est stocké dans un espace privé. Le texte extrait est utilisé en mémoire pour détecter les biomarqueurs puis n'est pas conservé séparément.</p>
    <Card className="mt-8 p-6 sm:p-8">{error ? <p className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}<form action={uploadBloodTest} className="space-y-5"><label className="block text-sm font-medium">Date du prélèvement<Input className="mt-2" name="sampleDate" type="date" required /></label><label className="block text-sm font-medium">Laboratoire <span className="font-normal text-neutral-400">(optionnel)</span><Input className="mt-2" name="labName" placeholder="Cerballiance, Biogroup…" /></label><label className="block rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center"><FileUp className="mx-auto size-7"/><span className="mt-3 block text-sm font-medium">Choisir un PDF</span><span className="mt-1 block text-xs text-neutral-500">PDF uniquement · 10 Mo max</span><input className="sr-only" name="file" type="file" accept="application/pdf" required /></label><div className="flex items-start gap-3 rounded-2xl bg-neutral-50 p-4 text-xs leading-5 text-neutral-600"><ShieldCheck className="mt-0.5 size-4 shrink-0"/><p>Ne téléversez que vos propres documents. Cette V1 n'est pas destinée aux comptes de mineurs ni au partage avec des professionnels de santé.</p></div><Button className="w-full" type="submit" size="lg">Importer et analyser</Button></form></Card>
  </div>;
}
