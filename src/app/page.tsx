import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Droplets,
  Eye,
  FileText,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from "lucide-react";

const attentionItems = [
  {
    icon: Stethoscope,
    label: "Dentiste",
    detail: "Dernière visite il y a 2 ans",
    tone: "bg-[#fff1f1] text-[#c95656]",
  },
  {
    icon: Activity,
    label: "Douleur au dos",
    detail: "Signalée depuis 3 semaines",
    tone: "bg-[#fff4ec] text-[#cf6f32]",
  },
  {
    icon: Droplets,
    label: "Bilan sanguin",
    detail: "36 marqueurs analysés",
    tone: "bg-[#eefaf5] text-[#258463]",
  },
  {
    icon: Eye,
    label: "Ophtalmologue",
    detail: "Contrôle à planifier",
    tone: "bg-[#eff5ff] text-[#426fb7]",
  },
];

const timeline = [
  { year: "2026", title: "Bilan sanguin", detail: "12 mars 2026", badge: "Résultats ajoutés", dot: "bg-emerald-500" },
  { year: "2025", title: "Consultation généraliste", detail: "3 février 2025", badge: "Compte-rendu", dot: "bg-blue-500" },
  { year: "2024", title: "Douleur au dos", detail: "Signalée le 12 novembre", badge: "Toujours active", dot: "bg-orange-400" },
  { year: "2023", title: "Vaccination grippe", detail: "4 octobre 2023", badge: "Enregistrée", dot: "bg-violet-500" },
  { year: "2022", title: "Consultation ophtalmologue", detail: "15 juin 2022", badge: "Compte-rendu", dot: "bg-neutral-400" },
];

function Brand() {
  return (
    <Link href="/" className="text-[22px] font-medium tracking-[-0.04em] text-neutral-950">
      baseline<span className="align-top text-[15px]">*</span>
    </Link>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-14 w-full max-w-5xl px-3 sm:px-8">
      <div className="rounded-[28px] border border-neutral-200/80 bg-[#fbfbfb] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.10)] sm:p-3">
        <div className="overflow-hidden rounded-[22px] border border-neutral-200 bg-white">
          <div className="grid min-h-[450px] md:grid-cols-[156px_1fr]">
            <aside className="hidden border-r border-neutral-100 bg-[#fafafa] p-5 md:block">
              <Brand />
              <div className="mt-10 space-y-2 text-[12px] text-neutral-500">
                <div className="rounded-xl bg-neutral-950 px-3 py-2.5 text-white">Accueil</div>
                <div className="px-3 py-2.5">Ma santé</div>
                <div className="px-3 py-2.5">Documents</div>
                <div className="px-3 py-2.5">Analyses</div>
                <div className="px-3 py-2.5">Timeline</div>
              </div>
            </aside>

            <div className="p-5 sm:p-7 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] text-neutral-400">Lundi 21 septembre</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.035em]">Bonjour Alex</h3>
                  <p className="mt-1 text-sm text-neutral-500">Voici ce qui mérite ton attention.</p>
                </div>
                <div className="grid size-9 place-items-center rounded-full bg-neutral-100 text-xs font-medium">AB</div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {attentionItems.map(({ icon: Icon, label, detail, tone }) => (
                  <div key={label} className="group flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.035)]">
                    <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-neutral-900">{label}</p>
                      <p className="mt-0.5 truncate text-xs text-neutral-500">{detail}</p>
                    </div>
                    <ChevronRight className="size-4 text-neutral-300 transition group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-neutral-100 bg-[#fcfcfc] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Ta santé dans le temps</p>
                    <p className="mt-1 text-xs text-neutral-400">Une vue simple de ton historique</p>
                  </div>
                  <span className="text-xs text-neutral-500">Voir la timeline</span>
                </div>
                <div className="mt-7 flex h-20 items-end gap-2 sm:gap-3" aria-hidden="true">
                  {[22, 34, 28, 44, 38, 58, 48, 66, 61, 76, 70, 82].map((height, index) => (
                    <div key={index} className="relative flex-1 rounded-full bg-neutral-100">
                      <div className="absolute bottom-0 w-full rounded-full bg-neutral-900/80" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-neutral-400">
                  <span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 right-2 hidden w-[210px] rotate-[2deg] rounded-[34px] border-[7px] border-neutral-900 bg-white p-3 shadow-[0_24px_60px_rgba(0,0,0,0.18)] lg:block">
        <div className="mx-auto h-1.5 w-14 rounded-full bg-neutral-900" />
        <div className="mt-6">
          <p className="text-[11px] text-neutral-400">Aujourd’hui</p>
          <p className="mt-1 text-lg font-semibold tracking-[-0.04em]">Bonjour Alex</p>
          <div className="mt-5 space-y-2">
            {attentionItems.slice(0, 3).map(({ icon: Icon, label, tone }) => (
              <div key={label} className="flex items-center gap-2 rounded-xl border border-neutral-100 p-2.5">
                <div className={`grid size-7 place-items-center rounded-lg ${tone}`}><Icon className="size-3.5" /></div>
                <span className="text-[10px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-neutral-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-8 text-sm text-neutral-500 md:flex">
          <a href="#vision" className="transition hover:text-neutral-950">Vision</a>
          <a href="#experience" className="transition hover:text-neutral-950">Comment ça marche</a>
          <Link href="/privacy" className="transition hover:text-neutral-950">Sécurité</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50 sm:inline-flex">Connexion</Link>
          <Link href="/signup" className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800">
            Découvrir Baseline <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 text-center lg:px-10 lg:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Votre santé. Aujourd’hui et demain.</p>
        <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
          Toute ta santé.<br />Enfin au même endroit.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
          Baseline garde le fil de ta santé, t’aide à suivre ce qui compte et te rappelle quand un sujet mérite d’être abordé avec ton médecin.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#experience" className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800">
            Voir la démo <ArrowRight className="size-4" />
          </a>
          <a href="#vision" className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50">
            Comment ça marche <ArrowRight className="size-4" />
          </a>
        </div>

        <DashboardPreview />
      </section>

      <section id="vision" className="border-y border-neutral-100 bg-[#fafafa]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Un constat simple</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              Ta santé ne devrait pas dépendre de ta mémoire.
            </h2>
          </div>
          <div className="flex max-w-xl flex-col justify-center">
            <p className="text-lg leading-8 text-neutral-600">
              Rendez-vous, documents, symptômes, analyses, vaccinations… tout est éparpillé. Baseline rassemble ce qui compte pour te donner une vision continue, sans transformer l’application en médecin.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-neutral-200 pt-8">
              <div><CalendarDays className="size-5" /><p className="mt-3 text-sm text-neutral-600">Te rappeler</p></div>
              <div><HeartPulse className="size-5" /><p className="mt-3 text-sm text-neutral-600">Te faire suivre</p></div>
              <div><FileText className="size-5" /><p className="mt-3 text-sm text-neutral-600">Tout rassembler</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-32">
        <div className="self-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Une vision long terme</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
            Tout ton historique.<br />Dans le temps.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-500">
            Consultations, symptômes, analyses, traitements et vaccinations deviennent un seul fil lisible. Tu vois ce qui a changé et ce qui mérite simplement d’être suivi.
          </p>
          <Link href="/signup" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-neutral-200 px-5 text-sm font-medium transition hover:bg-neutral-50">
            Créer mon espace <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative rounded-[28px] border border-neutral-100 bg-[#fafafa] p-6 sm:p-9">
          <div className="absolute bottom-10 left-[89px] top-10 w-px bg-neutral-200 sm:left-[105px]" />
          <div className="space-y-1">
            {timeline.map((item) => (
              <div key={item.year} className="relative grid grid-cols-[54px_20px_1fr] items-center gap-3 rounded-2xl p-3 transition hover:bg-white sm:grid-cols-[64px_26px_1fr]">
                <span className="text-xs text-neutral-400">{item.year}</span>
                <span className={`relative z-10 mx-auto size-2.5 rounded-full ring-4 ring-[#fafafa] ${item.dot}`} />
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-400">{item.detail}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] text-neutral-500 sm:inline-flex">{item.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-[#fafafa]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-neutral-950 p-7 text-white sm:p-10">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <div className="grid size-12 place-items-center rounded-full bg-white/10">
                <ShieldCheck className="size-5" />
              </div>
              <p className="mt-24 max-w-sm text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">
                Un rappel pour ta santé de demain.
              </p>
              <div className="mt-8 rounded-2xl bg-white p-4 text-neutral-950">
                <div className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fff1f1] text-[#c95656]"><Stethoscope className="size-4" /></div>
                  <div>
                    <p className="text-sm font-medium">Dentiste</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">Cela fait 2 ans depuis ton dernier rendez-vous. Pense à organiser un contrôle.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Un outil, pas un diagnostic</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              Baseline ne remplace pas ton médecin.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500">
              Baseline organise ton suivi et met en évidence les informations que tu as déjà renseignées. Pour toute question médicale, l’application t’oriente vers un professionnel de santé.
            </p>
            <div className="mt-10 grid gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
              <div><ShieldCheck className="size-5" /><p className="mt-3 text-sm text-neutral-600">Tes données restent sous ton contrôle</p></div>
              <div><Stethoscope className="size-5" /><p className="mt-3 text-sm text-neutral-600">Ton médecin reste la référence</p></div>
              <div><Syringe className="size-5" /><p className="mt-3 text-sm text-neutral-600">Ton historique reste lisible</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 text-center lg:py-36">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Un meilleur suivi. Une vie plus sereine.</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Prends le fil de ta santé.</h2>
        <Link href="/signup" className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800">
          Découvrir la démo <ArrowRight className="size-4" />
        </Link>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-neutral-100 px-6 py-8 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="flex items-center gap-4">
          <Brand />
          <span>Le fil de votre santé.</span>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="/privacy">Confidentialité</Link>
          <Link href="/terms">Conditions</Link>
          <Link href="/legal-notice">Mentions légales</Link>
          <Link href="/medical-disclaimer">Information médicale</Link>
        </div>
      </footer>
    </main>
  );
}
