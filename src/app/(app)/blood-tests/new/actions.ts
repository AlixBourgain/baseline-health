"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { extractLabResultsFromPdf } from "@/lib/health/parse-lab-pdf";
import { sanitizeFilename } from "@/lib/utils";
import { sha256Hex } from "@/lib/security";
import { getServerEnv } from "@/lib/env";

const metaSchema = z.object({
  sampleDate: z.iso.date(),
  labName: z.string().trim().max(120).optional(),
});

export async function uploadBloodTest(formData: FormData) {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: consentEvents } = await supabase.from("privacy_consents").select("action,version").eq("purpose", "health_data_processing").order("occurred_at", { ascending: false }).limit(1);
  if (!consentEvents?.length || consentEvents[0].action !== "granted" || consentEvents[0].version !== getServerEnv().HEALTH_DATA_CONSENT_VERSION) redirect("/settings/privacy?consent=required");
  const parsedMeta = metaSchema.safeParse({ sampleDate: formData.get("sampleDate"), labName: String(formData.get("labName") ?? "") || undefined });
  const file = formData.get("file");

  if (!parsedMeta.success || !(file instanceof File)) redirect("/blood-tests/new?error=Informations invalides");
  if (file.type !== "application/pdf") redirect("/blood-tests/new?error=Le fichier doit être un PDF");
  if (file.size <= 0 || file.size > 10 * 1024 * 1024) redirect("/blood-tests/new?error=Le PDF doit faire moins de 10 Mo");

  const bytes = await file.arrayBuffer();
  const hash = await sha256Hex(bytes);

  const { data: duplicate } = await supabase.from("lab_reports").select("id").eq("sha256", hash).maybeSingle();
  if (duplicate) redirect(`/blood-tests/${duplicate.id}`);

  const { data: report, error: insertError } = await supabase.from("lab_reports").insert({
    user_id: user.id,
    sample_date: parsedMeta.data.sampleDate,
    lab_name: parsedMeta.data.labName || null,
    original_filename: sanitizeFilename(file.name),
    sha256: hash,
    status: "processing",
    extraction_version: "local-pdf-v1",
  }).select("id").single();

  if (insertError || !report) redirect("/blood-tests/new?error=Impossible de créer le dossier d'analyse");

  const path = `${user.id}/${report.id}-${sanitizeFilename(file.name)}`;
  const { error: uploadError } = await supabase.storage.from("health-documents").upload(path, bytes, {
    contentType: "application/pdf",
    cacheControl: "0",
    upsert: false,
  });

  if (uploadError) {
    await supabase.from("lab_reports").update({ status: "failed" }).eq("id", report.id);
    redirect(`/blood-tests/${report.id}?error=Le document n'a pas pu être stocké`);
  }

  await supabase.from("lab_reports").update({ storage_path: path }).eq("id", report.id);

  try {
    const extracted = await extractLabResultsFromPdf(Buffer.from(bytes));
    if (extracted.length) {
      const slugs = extracted.map((r) => r.biomarkerSlug);
      const { data: catalog } = await supabase.from("biomarker_catalog").select("id,slug,canonical_unit").in("slug", slugs);
      const bySlug = new Map((catalog ?? []).map((b) => [b.slug, b]));
      const rows = extracted.flatMap((r) => {
        const biomarker = bySlug.get(r.biomarkerSlug);
        if (!biomarker) return [];
        return [{
          user_id: user.id,
          report_id: report.id,
          biomarker_id: biomarker.id,
          raw_name: r.rawName,
          value_numeric: r.valueNumeric,
          unit_raw: r.unitRaw,
          unit_canonical: unitsMatch(r.unitRaw, biomarker.canonical_unit) ? biomarker.canonical_unit : null,
          reference_low: r.referenceLow,
          reference_high: r.referenceHigh,
          flag: r.flag,
        }];
      });
      if (rows.length) await supabase.from("lab_results").insert(rows);
    }
    await supabase.from("lab_reports").update({ status: extracted.length ? "ready" : "needs_review" }).eq("id", report.id);
  } catch {
    await supabase.from("lab_reports").update({ status: "needs_review" }).eq("id", report.id);
  }

  redirect(`/blood-tests/${report.id}`);
}

function unitsMatch(raw: string | null, canonical: string | null) {
  if (!raw || !canonical) return false;
  const n = (v: string) => v.toLowerCase().replace(/µ/g, "u").replace(/²/g, "2").replace(/\s/g, "").replace(/,/g, ".");
  return n(raw) === n(canonical);
}
