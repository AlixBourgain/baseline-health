"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  reportId: z.uuid(),
  biomarkerSlug: z.string().min(1).max(80),
  value: z.coerce.number().finite(),
  unit: z.string().trim().min(1).max(30),
  referenceLow: z.union([z.literal(""), z.coerce.number().finite()]).optional(),
  referenceHigh: z.union([z.literal(""), z.coerce.number().finite()]).optional(),
});

function normalizedUnit(v: string) {
  return v.toLowerCase().replace(/µ/g, "u").replace(/²/g, "2").replace(/\s/g, "").replace(/,/g, ".");
}

export async function upsertManualResult(formData: FormData) {
  const user = await requireUser();
  const parsed = schema.safeParse({
    reportId: formData.get("reportId"),
    biomarkerSlug: formData.get("biomarkerSlug"),
    value: formData.get("value"),
    unit: formData.get("unit"),
    referenceLow: formData.get("referenceLow") ?? "",
    referenceHigh: formData.get("referenceHigh") ?? "",
  });
  if (!parsed.success) return;

  const supabase = await createClient();
  const { data: report } = await supabase.from("lab_reports").select("id").eq("id", parsed.data.reportId).maybeSingle();
  if (!report) return;
  const { data: biomarker } = await supabase.from("biomarker_catalog").select("id,display_name,canonical_unit").eq("slug", parsed.data.biomarkerSlug).maybeSingle();
  if (!biomarker) return;

  const low = parsed.data.referenceLow === "" || parsed.data.referenceLow === undefined ? null : Number(parsed.data.referenceLow);
  const high = parsed.data.referenceHigh === "" || parsed.data.referenceHigh === undefined ? null : Number(parsed.data.referenceHigh);
  const value = parsed.data.value;
  const flag = low !== null && value < low ? "low" : high !== null && value > high ? "high" : low !== null || high !== null ? "normal" : "unknown";
  const canonical = biomarker.canonical_unit && normalizedUnit(parsed.data.unit) === normalizedUnit(biomarker.canonical_unit) ? biomarker.canonical_unit : null;

  await supabase.from("lab_results").upsert({
    user_id: user.id,
    report_id: report.id,
    biomarker_id: biomarker.id,
    raw_name: biomarker.display_name,
    value_numeric: value,
    value_text: null,
    unit_raw: parsed.data.unit,
    unit_canonical: canonical,
    reference_low: low,
    reference_high: high,
    flag,
  }, { onConflict: "report_id,biomarker_id" });
  await supabase.from("lab_reports").update({ status: "ready" }).eq("id", report.id);
  revalidatePath(`/blood-tests/${report.id}`);
  revalidatePath("/biomarkers");
  revalidatePath("/dashboard");
}
