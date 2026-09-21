import type { SupabaseClient } from "@supabase/supabase-js";

export async function deleteAllUserDocuments(admin: SupabaseClient, userId: string) {
  while (true) {
    const { data, error } = await admin.storage.from("health-documents").list(userId, { limit: 100, offset: 0 });
    if (error) throw error;
    if (!data?.length) break;
    const paths = data.map((file) => `${userId}/${file.name}`);
    const { error: removeError } = await admin.storage.from("health-documents").remove(paths);
    if (removeError) throw removeError;
  }
}
