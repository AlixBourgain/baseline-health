import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "../actions";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  return <main className="grid min-h-screen place-items-center px-6"><div className="w-full max-w-md"><Logo/><div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-7"><h1 className="text-2xl font-semibold">Réinitialiser le mot de passe</h1>{message ? <p className="mt-4 rounded-xl bg-neutral-100 p-3 text-sm">{message}</p> : null}<form action={requestPasswordReset} className="mt-6 space-y-4"><Input type="email" name="email" placeholder="vous@exemple.fr" required/><Button className="w-full">Envoyer le lien</Button></form></div></div></main>;
}
