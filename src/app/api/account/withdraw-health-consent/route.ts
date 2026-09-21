import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSameOrigin } from "@/lib/security";
import { deleteAllUserDocuments } from "@/lib/storage";
import { getServerEnv } from "@/lib/env";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  await deleteAllUserDocuments(admin, data.user.id);
  await admin.from("lab_reports").delete().eq("user_id", data.user.id);
  await admin.from("privacy_consents").insert({
    user_id: data.user.id,
    purpose: "health_data_processing",
    version: getServerEnv().HEALTH_DATA_CONSENT_VERSION,
    action: "withdrawn",
    source: "settings",
  });

  return NextResponse.redirect(new URL("/settings/privacy?consent=withdrawn", request.url), 303);
}
