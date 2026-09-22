import Link from "next/link";
import { HealthOrbit } from "@/components/landing/health-orbit";
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

function HealthField() {
  const milestones = [
    { year: "2022", title: "Ophtalmologue", detail: "Dernier contrôle", icon: Eye, x: "8%", y: "58%", tone: "bg-[#eef4ff] text-[#416cb3]" },
    { year: "2024", title: "Généraliste", detail: "Compte-rendu ajouté", icon: Stethoscope, x: "30%", y: "34%", tone: "bg-[#f2f2f2] text-neutral-700" },
    { year: "2026", title: "Bilan sanguin", detail: "36 marqueurs", icon: Droplets, x: "55%", y: "56%", tone: "bg-[#ecf9f4] text-[#238060]" },
    { year: "Aujourd’hui", title: "3 sujets à suivre", detail: "Rien à retenir par cœur", icon: HeartPulse, x: "78%", y: "28%", tone: "bg-neutral-950 text-white" },
  ];

  return (
    <div className="relative mx-auto mt-14 h-[470px] w-full max-w-6xl overflow-hidden rounded-[34px] border border-neutral-200/80 bg-[#fbfbfa] shadow-[0_32px_100px_rgba(0,0,0,0.08)] sm:h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(0,0,0,0.055),transparent_30%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.015))]" />

      <div className="absolute left-6 top-6 z-20 flex items-center gap-3 rounded-full border border-neutral-200 bg-white/85 px-4 py-2.5 shadow-sm backdrop-blur-xl sm:left-8 sm:top-8">
        <div className="size-2 rounded-full bg-emerald-500 baseline-pulse" />
        <span className="text-xs font-medium text-neutral-700">Ta santé, en continu</span>
      </div>

      <div className="absolute right-6 top-6 z-20 hidden rounded-full border border-neutral-200 bg-white/85 px-4 py-2.5 text-xs text-neutral-500 backdrop-blur-xl sm:block">
        4 années reliées
      </div>

      <svg className="absolute inset-x-0 top-[118px] h-[260px] w-full" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="healthLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#d9d9d7" />
            <stop offset="72%" stopColor="#b9b9b6" />
            <stop offset="100%" stopColor="#171717" />
          </linearGradient>
        </defs>
        <path d="M0 190 C170 170 220 75 390 92 C560 110 620 210 790 160 C930 118 1000 35 1200 76" fill="none" stroke="url(#healthLine)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M0 190 C170 170 220 75 390 92 C560 110 620 210 790 160 C930 118 1000 35 1200 76" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeDasharray="18 1182" className="baseline-travel" opacity=".9" />
      </svg>

      <div className="absolute bottom-10 left-6 right-6 h-px bg-neutral-200/80 sm:left-10 sm:right-10" />
      <div className="absolute bottom-5 left-6 right-6 flex justify-between text-[10px] uppercase tracking-[0.18em] text-neutral-400 sm:left-10 sm:right-10">
        <span>Passé</span><span>Aujourd’hui</span><span>À suivre</span>
      </div>

      {milestones.map(({ year, title, detail, icon: Icon, x, y, tone }, index) => (
        <div
          key={title}
          className={`absolute z-10 hidden w-[190px] -translate-x-1/2 rounded-2xl border border-neutral-200/80 bg-white/92 p-3.5 shadow-[0_14px_36px_rgba(0,0,0,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:block ${index === 3 ? "ring-1 ring-neutral-900/5" : ""}`}
          style={{ left: x, top: y }}
        >
          <div className="flex items-start gap-3">
            <div className={`grid size-9 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="size-4" /></div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">{year}</p>
              <p className="mt-1 truncate text-sm font-medium text-neutral-900">{title}</p>
              <p className="mt-0.5 truncate text-xs text-neutral-400">{detail}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute left-[78%] top-[48%] hidden -translate-x-1/2 sm:block">
        <div className="relative grid size-16 place-items-center rounded-full bg-neutral-950 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
          <span className="text-[11px] font-medium">Maintenant</span>
          <span className="absolute inset-0 rounded-full border border-neutral-900/20 baseline-ring" />
        </div>
      </div>

      <div className="absolute inset-x-5 top-24 grid gap-3 sm:hidden">
        {attentionItems.slice(0, 3).map(({ icon: Icon, label, detail, tone }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon className="size-4" /></div>
            <div className="min-w-0">
              <p className="text-sm font-medium">{label}</p>
              <p className="truncate text-xs text-neutral-400">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-16 right-6 hidden max-w-[300px] text-right sm:block">
        <p className="text-2xl font-semibold tracking-[-0.045em] text-neutral-900">Une mémoire de santé.</p>
        <p className="mt-2 text-sm leading-6 text-neutral-500">Baseline relie les signaux dispersés pour te montrer ce qui compte maintenant.</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-neutral-950">
      <header className="border-b border-neutral-100/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Brand />
          <nav className="hidden items-center gap-8 text-[13px] text-neutral-500 md:flex">
            <a href="#vision" className="transition hover:text-neutral-950">Vision</a>
            <a href="#experience" className="transition hover:text-neutral-950">Comment ça marche</a>
            <Link href="/privacy" className="transition hover:text-neutral-950">Sécurité</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50 sm:inline-flex">Connexion</Link>
            <Link
              href="/signup"
              style={{ color: "#fff" }}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium shadow-sm transition hover:bg-neutral-800"
            >
              <span style={{ color: "#fff" }}>Commencer</span>
              <ArrowRight className="size-3.5 text-white" />
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-[radial-gradient(circle_at_50%_0%,#f5f5f2_0%,#ffffff_50%)]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 text-center lg:px-10 lg:pt-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">La mémoire de ta santé</p>

          <h1
            className="mx-auto mt-6 max-w-[1080px] text-[clamp(3.25rem,5.5vw,5.35rem)] font-semibold leading-[0.96] tracking-[-0.06em]"
            style={{ textWrap: "balance" }}
          >
            <span className="block">Ta santé a une histoire.</span>
            <span className="block text-neutral-400">Baseline la relie.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[690px] text-base leading-7 text-neutral-500 sm:text-[18px] sm:leading-8">
            Analyses, rendez-vous, symptômes, documents et rappels deviennent un seul fil vivant. Tu n’as plus à te souvenir de tout pour prendre soin de toi.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#experience"
              style={{ color: "#fff" }}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium shadow-sm transition hover:bg-neutral-800"
            >
              <span style={{ color: "#fff" }}>Voir la démo</span>
              <ArrowRight className="size-4 text-white" />
            </a>
            <a href="#vision" className="inline-flex h-12 items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-700 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:bg-neutral-50">
              Comment ça marche <ArrowRight className="size-4" />
            </a>
          </div>

          <p className="mt-4 text-xs text-neutral-400">Un outil de suivi et d’organisation. Jamais un diagnostic.</p>

          <HealthOrbit />
        </div>
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
        <Link href="/signup" style={{ color: "#fff" }} className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800">
          <span style={{ color: "#fff" }}>Découvrir la démo</span> <ArrowRight className="size-4 text-white" />
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
