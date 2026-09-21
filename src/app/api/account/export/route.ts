import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = authData.user;

  const [{ data: profile }, { data: consents }, { data: reports }, { data: results }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("privacy_consents").select("purpose,version,action,source,occurred_at").order("occurred_at"),
    supabase.from("lab_reports").select("id,sample_date,lab_name,original_filename,status,created_at").order("sample_date"),
    supabase.from("lab_results").select("report_id,raw_name,value_numeric,value_text,unit_raw,unit_canonical,reference_low,reference_high,flag,created_at,biomarker_catalog(slug,display_name,category)").order("created_at"),
  ]);

  const payload = {
    exported_at: new Date().toISOString(),
    account: { id: user.id, email: user.email, created_at: user.created_at },
    profile,
    consents,
    lab_reports: reports,
    lab_results: results,
    note: "Les PDF originaux peuvent être téléchargés depuis chaque analyse. Cet export contient les données structurées du compte.",
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="baseline-export-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "no-store, private",
    },
  });
}
