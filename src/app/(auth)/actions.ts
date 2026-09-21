"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getServerEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

const emailSchema = z.email().max(254);
const passwordSchema = z.string().min(12).max(128);

function withMessage(path: string, message: string) {
  return `${path}?message=${encodeURIComponent(message)}`;
}

export async function login(formData: FormData) {
  const email = emailSchema.safeParse(formData.get("email"));
  const password = passwordSchema.safeParse(formData.get("password"));
  if (!email.success || !password.success) redirect(withMessage("/login", "Identifiants invalides."));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: email.data, password: password.data });
  if (error) redirect(withMessage("/login", "Connexion impossible. Vérifiez vos identifiants."));
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const email = emailSchema.safeParse(formData.get("email"));
  const password = passwordSchema.safeParse(formData.get("password"));
  const firstName = z.string().trim().min(1).max(80).safeParse(formData.get("firstName"));
  const adult = formData.get("adult") === "on";
  const healthConsent = formData.get("healthConsent") === "on";
  const privacyAccepted = formData.get("privacyAccepted") === "on";
  if (!email.success || !password.success || !firstName.success || !adult || !healthConsent || !privacyAccepted) {
    redirect(withMessage("/signup", "Complétez les champs et consentements requis."));
  }

  const env = getServerEnv();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.data,
    password: password.data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/auth/callback?next=/dashboard`,
      data: { first_name: firstName.data },
    },
  });
  if (error) {
  console.error("SUPABASE SIGNUP ERROR:", error);
  redirect(withMessage("/signup", "Création du compte impossible."));
}

if (!data.user) {
  console.error("SUPABASE SIGNUP ERROR: aucun utilisateur retourné");
  redirect(withMessage("/signup", "Création du compte impossible."));
}

  // Consent evidence is written server-side with the secret key. Never trust user_metadata
  // for authorization or as the sole audit trail of an explicit health-data consent.
  let consentWriteFailed = false;
  try {
    const admin = createAdminClient();
    const { error: consentError } = await admin.from("privacy_consents").insert([
      { user_id: data.user.id, purpose: "health_data_processing", version: env.HEALTH_DATA_CONSENT_VERSION, action: "granted", source: "signup" },
      { user_id: data.user.id, purpose: "privacy_notice_acknowledgement", version: env.PRIVACY_NOTICE_VERSION, action: "granted", source: "signup" },
      { user_id: data.user.id, purpose: "adult_attestation", version: "18+", action: "granted", source: "signup" },
    ]);
    consentWriteFailed = Boolean(consentError);
  } catch (error) {
    // A missing/invalid server secret must never produce a blank screen after signup.
    console.error("Unable to write signup consent evidence", error);
    consentWriteFailed = true;
  }

  // Never delete the Auth account when the audit write fails. Tell the developer/user what
  // happened and keep health uploads blocked until a valid consent event can be recorded.
  if (consentWriteFailed) {
    redirect(withMessage(
      "/login",
      "Compte créé, mais la configuration serveur Supabase est incomplète. Ajoutez SUPABASE_SECRET_KEY dans .env.local puis redémarrez l’application."
    ));
  }

  if (data.session) redirect("/dashboard");
  redirect(withMessage("/login", "Compte créé. Vérifiez votre e-mail pour confirmer votre adresse."));
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(formData: FormData) {
  const email = emailSchema.safeParse(formData.get("email"));
  if (email.success) {
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(email.data, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/auth/callback?next=/reset-password`,
    });
  }
  redirect(withMessage("/forgot-password", "Si ce compte existe, un e-mail de réinitialisation a été envoyé."));
}

export async function updatePassword(formData: FormData) {
  const password = passwordSchema.safeParse(formData.get("password"));
  const confirm = passwordSchema.safeParse(formData.get("confirm"));
  if (!password.success || !confirm.success || password.data !== confirm.data) redirect(withMessage("/reset-password", "Les mots de passe doivent être identiques et contenir au moins 12 caractères."));
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect(withMessage("/login", "Le lien de réinitialisation a expiré."));
  const { error } = await supabase.auth.updateUser({ password: password.data });
  if (error) redirect(withMessage("/reset-password", "Impossible de mettre à jour le mot de passe."));
  redirect("/dashboard");
}
