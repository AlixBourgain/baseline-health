import Link from "next/link";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "../actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  return <AuthShell title="Bon retour" subtitle="Connectez-vous à votre espace santé privé.">
    {message ? <p className="mb-4 rounded-xl bg-neutral-100 p-3 text-sm text-neutral-700">{message}</p> : null}
    <form action={login} className="space-y-4">
      <label className="block text-sm font-medium">E-mail<Input className="mt-2" name="email" type="email" autoComplete="email" required /></label>
      <label className="block text-sm font-medium">Mot de passe<Input className="mt-2" name="password" type="password" autoComplete="current-password" minLength={12} required /></label>
      <Button className="w-full" type="submit">Se connecter</Button>
    </form>
    <div className="mt-5 flex justify-between text-sm text-neutral-500"><Link href="/signup">Créer un compte</Link><Link href="/forgot-password">Mot de passe oublié ?</Link></div>
  </AuthShell>;
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <main className="grid min-h-screen place-items-center px-6 py-12"><div className="w-full max-w-md"><Logo/><div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm"><h1 className="text-3xl font-semibold tracking-tight">{title}</h1><p className="mt-2 text-sm leading-6 text-neutral-500">{subtitle}</p><div className="mt-7">{children}</div></div></div></main>;
}
