import Link from "next/link";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "../actions";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  return <main className="grid min-h-screen place-items-center px-6 py-12"><div className="w-full max-w-lg"><Logo/><div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm"><h1 className="text-3xl font-semibold tracking-tight">Créer votre espace</h1><p className="mt-2 text-sm leading-6 text-neutral-500">MVP réservé aux personnes majeures. Vos documents de santé sont traités comme données sensibles.</p>
    {message ? <p className="mt-5 rounded-xl bg-neutral-100 p-3 text-sm">{message}</p> : null}
    <form action={signup} className="mt-7 space-y-4">
      <label className="block text-sm font-medium">Prénom<Input className="mt-2" name="firstName" autoComplete="given-name" required /></label>
      <label className="block text-sm font-medium">E-mail<Input className="mt-2" name="email" type="email" autoComplete="email" required /></label>
      <label className="block text-sm font-medium">Mot de passe<Input className="mt-2" name="password" type="password" autoComplete="new-password" minLength={12} required /><span className="mt-1 block text-xs font-normal text-neutral-500">12 caractères minimum.</span></label>
      <Consent name="adult">Je confirme avoir 18 ans ou plus.</Consent>
      <Consent name="healthConsent">Je consens explicitement au traitement de mes données de santé pour fournir les fonctions de suivi et comparaison décrites dans la politique de confidentialité.</Consent>
      <Consent name="privacyAccepted">J’ai lu la <Link className="underline" href="/privacy">politique de confidentialité</Link> et les <Link className="underline" href="/terms">conditions d’utilisation</Link>.</Consent>
      <Button className="w-full" type="submit">Créer mon compte</Button>
    </form>
    <p className="mt-5 text-sm text-neutral-500">Déjà un compte ? <Link className="text-neutral-950" href="/login">Se connecter</Link></p>
  </div></div></main>;
}

function Consent({ name, children }: { name: string; children: React.ReactNode }) {
  return <label className="flex gap-3 rounded-xl border border-neutral-200 p-3 text-sm leading-5 text-neutral-700"><input className="mt-1 size-4" type="checkbox" name={name} required /><span>{children}</span></label>;
}
