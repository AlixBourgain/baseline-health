import { z } from "zod";

const serverSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(10),
  SUPABASE_SECRET_KEY: z.string().min(10).optional(),
  HEALTH_DATA_CONSENT_VERSION: z.string().default("2026-09-20"),
  PRIVACY_NOTICE_VERSION: z.string().default("2026-09-20"),
});

export function getServerEnv() {
  return serverSchema.parse({
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    HEALTH_DATA_CONSENT_VERSION: process.env.HEALTH_DATA_CONSENT_VERSION,
    PRIVACY_NOTICE_VERSION: process.env.PRIVACY_NOTICE_VERSION,
  });
}
