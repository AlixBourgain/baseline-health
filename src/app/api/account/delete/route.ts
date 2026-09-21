import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSameOrigin } from "@/lib/security";
import { deleteAllUserDocuments } from "@/lib/storage";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const formData = await request.formData();
  if (formData.get("confirmation") !== "SUPPRIMER") return NextResponse.json({ error: "Confirmation required" }, { status: 400 });

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await supabase.auth.signOut();
  const admin = createAdminClient();
  await deleteAllUserDocuments(admin, data.user.id);

  const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
  if (deleteError) return NextResponse.json({ error: "Deletion failed" }, { status: 500 });

  return NextResponse.redirect(new URL("/?deleted=1", request.url), 303);
}
