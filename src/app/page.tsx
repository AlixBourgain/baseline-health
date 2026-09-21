import Link from "next/link";
import { ArrowRight, FileText, LineChart, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/logo";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f7f5]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Logo />
        <div className="flex items-center gap-2">
          <Link className="rounded-full px-4 py-2 text-sm text-neutral-600 hover:bg-white" href="/login">Connexion</Link>
          <Link className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white" href="/signup">Créer mon espace</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pt-28">
        <div>
          <span className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600">Votre santé, dans le temps</span>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-950 md:text-7xl">Vos analyses ne devraient pas disparaître dans des PDF.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">Importez vos bilans biologiques, retrouvez chaque biomarqueur et comparez vos valeurs année après année dans un espace privé.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white">Commencer <ArrowRight className="size-4" /></Link>
            <Link href="/privacy" className="inline-flex h-12 items-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-medium">Vie privée</Link>
          </div>
        </div>

        <div className="health-grid rounded-[36px] border border-neutral-200 bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,.06)]">
          <div className="rounded-[28px] border border-neutral-200 bg-[#fbfcfa] p-6">
            <p className="text-sm text-neutral-500">Inflammation</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div><p className="text-4xl font-semibold tracking-tight">CRP</p><p className="mt-1 text-sm text-neutral-500">Suivi depuis 2023</p></div>
              <p className="text-right"><span className="text-3xl font-semibold">12</span><span className="ml-1 text-sm text-neutral-500">mg/L</span></p>
            </div>
            <svg className="mt-8 h-36 w-full" viewBox="0 0 600 160" role="img" aria-label="Exemple de courbe CRP">
              <path d="M10 125 C120 120 160 122 235 118 C330 115 345 40 420 48 C505 58 520 95 590 105" fill="none" stroke="#181b19" strokeWidth="4" strokeLinecap="round" />
              <circle cx="590" cy="105" r="7" fill="#181b19" />
            </svg>
            <div className="mt-4 grid grid-cols-4 text-xs text-neutral-400"><span>2023</span><span>2024</span><span>2025</span><span className="text-right">2026</span></div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[ [FileText,"PDF privés","Import et stockage privé"], [LineChart,"Historique","Comparaison annuelle"], [LockKeyhole,"Contrôle","Export et suppression"] ].map(([Icon,title,copy]) => {
              const I = Icon as typeof FileText;
              return <div key={String(title)} className="rounded-2xl border border-neutral-200 bg-white p-4"><I className="size-5"/><p className="mt-6 text-sm font-medium">{String(title)}</p><p className="mt-1 text-xs leading-5 text-neutral-500">{String(copy)}</p></div>
            })}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 px-6 py-8 text-xs text-neutral-500 lg:px-10">
        <Link href="/privacy">Confidentialité</Link><Link href="/terms">Conditions</Link><Link href="/legal-notice">Mentions légales</Link><Link href="/medical-disclaimer">Information médicale</Link>
      </footer>
    </main>
  );
}
