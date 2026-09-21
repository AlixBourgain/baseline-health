import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePassword } from "../actions";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  return <main className="grid min-h-screen place-items-center px-6"><div className="w-full max-w-md"><Logo/><div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-7"><h1 className="text-2xl font-semibold">Nouveau mot de passe</h1>{message ? <p className="mt-4 rounded-xl bg-neutral-100 p-3 text-sm">{message}</p> : null}<form action={updatePassword} className="mt-6 space-y-4"><Input type="password" name="password" minLength={12} autoComplete="new-password" placeholder="12 caractères minimum" required/><Input type="password" name="confirm" minLength={12} autoComplete="new-password" placeholder="Confirmer le mot de passe" required/><Button className="w-full">Enregistrer</Button></form></div></div></main>;
}
