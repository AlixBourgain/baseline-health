import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Droplets,
  Eye,
  FileText,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { BiomarkerShowcase } from "@/components/landing/biomarker-showcase";

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`text-[22px] font-medium tracking-[-0.045em] ${inverse ? "text-white" : "text-neutral-950"}`}
    >
      baseline<span className="align-top text-[14px]">*</span>
    </Link>
  );
}

const attention = [
  { icon: Stethoscope, label: "Dentiste", copy: "Dernière visite il y a 2 ans", tone: "bg-[#fff0ef] text-[#c85b55]" },
  { icon: Activity, label: "Douleur au dos", copy: "Signalée depuis 3 semaines", tone: "bg-[#fff4ea] text-[#c86b2c]" },
  { icon: Eye, label: "Ophtalmologue", copy: "Contrôle à planifier", tone: "bg-[#eef4ff] text-[#4d73b9]" },
];

const flow = [
  {
    number: "01",
    title: "Rassemble",
    copy: "Analyses, rendez-vous, documents et symptômes retrouvent enfin le même endroit.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Relie",
    copy: "Baseline transforme des données isolées en historique lisible, année après année.",
    icon: HeartPulse,
  },
  {
    number: "03",
    title: "Garde le fil",
    copy: "Tu vois ce qui évolue, ce qui arrive bientôt et ce qui mérite simplement d’être abordé.",
    icon: CalendarDays,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f2f2ef] text-neutral-950">
      <header className="relative z-50 border-b border-black/[0.045] bg-[#f2f2ef]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
          <Brand />
          <nav className="hidden items-center gap-8 text-[13px] text-neutral-500 md:flex">
            <a href="#vision" className="transition hover:text-neutral-950">Vision</a>
            <a href="#biomarkers" className="transition hover:text-neutral-950">Biomarqueurs</a>
            <a href="#how" className="transition hover:text-neutral-950">Comment ça marche</a>
            <Link href="/privacy" className="transition hover:text-neutral-950">Sécurité</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden px-4 py-2 text-sm text-neutral-600 sm:inline-flex">Connexion</Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
              style={{ color: "#fff" }}
            >
              <span style={{ color: "#fff" }}>Commencer</span>
              <ArrowRight className="size-3.5 text-white" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,.98),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(211,219,255,.48),transparent_26%),radial-gradient(circle_at_55%_76%,rgba(218,239,230,.42),transparent_24%)]" />
        <div className="relative mx-auto max-w-[1320px] px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
          <div className="mx-auto max-w-[980px] text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/70 px-3.5 py-2 text-[11px] font-medium text-neutral-500 shadow-sm backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Votre santé, dans le temps
            </div>
            <h1
              className="mx-auto mt-7 text-[clamp(3.6rem,6.5vw,6.7rem)] font-semibold leading-[0.91] tracking-[-0.068em]"
              style={{ textWrap: "balance" }}
            >
              Toute ta santé.
              <span className="mt-1 block text-neutral-400">Enfin au même endroit.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[720px] text-[17px] leading-8 text-neutral-500 sm:text-[19px]">
              Baseline rassemble tes analyses, tes rendez-vous, tes symptômes et tes documents pour reconstruire une vision continue de ta santé.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,.12)] transition hover:-translate-y-0.5 hover:bg-neutral-800"
                style={{ color: "#fff" }}
              >
                <span style={{ color: "#fff" }}>Découvrir Baseline</span>
                <ArrowRight className="size-4 text-white" />
              </Link>
              <a href="#biomarkers" className="inline-flex h-12 items-center gap-2 rounded-full border border-black/[0.07] bg-white/75 px-6 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur-xl transition hover:bg-white">
                Voir l’évolution <ChevronRight className="size-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-neutral-400">Un outil de suivi et d’organisation. Jamais un diagnostic.</p>
          </div>

          <div id="biomarkers" className="mt-14 sm:mt-16">
            <BiomarkerShowcase />
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-3">
            {[
              ["36", "résultats structurés dans un bilan"],
              ["5 ans", "d’historique peuvent être reliés"],
              ["1 vue", "pour comprendre ce qui évolue"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[22px] border border-black/[0.055] bg-white/55 px-5 py-4 text-center backdrop-blur-xl">
                <p className="text-2xl font-semibold tracking-[-0.045em]">{value}</p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="relative bg-[#0c0d0f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(107,139,255,.18),transparent_28%),radial-gradient(circle_at_85%_65%,rgba(69,188,149,.13),transparent_30%)]" />
        <div className="relative mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">Ce qui mérite ton attention</p>
              <h2 className="mt-5 max-w-[520px] text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl">
                Ta santé ne devrait pas dépendre de ta mémoire.
              </h2>
              <p className="mt-6 max-w-[520px] text-base leading-7 text-white/50">
                Baseline ne te demande pas d’être expert. Il organise ce que tu sais déjà et te remet les bons sujets sous les yeux au bon moment.
              </p>
              <div className="mt-9 space-y-3">
                {["Suivi préventif", "Historique médical", "Analyses biologiques", "Documents et symptômes"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="grid size-6 place-items-center rounded-full bg-white/[0.07]"><Check className="size-3.5" /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_35px_100px_rgba(0,0,0,.36)] backdrop-blur-2xl sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(102,131,255,.14),transparent_28%)]" />
              <div className="relative rounded-[28px] border border-white/10 bg-[#15171b]/90 p-5 sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-white/35">Mardi 22 septembre</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Bonjour Alex</h3>
                    <p className="mt-1 text-sm text-white/40">Voici ce qui mérite ton attention aujourd’hui.</p>
                  </div>
                  <div className="grid size-9 place-items-center rounded-full bg-white/10 text-xs text-white/70">AB</div>
                </div>

                <div className="mt-8 grid gap-3">
                  {attention.map(({ icon: Icon, label, copy, tone }) => (
                    <div key={label} className="flex items-center gap-3 rounded-[20px] border border-white/[0.07] bg-white/[0.045] p-4">
                      <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="size-4" /></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">{label}</p>
                        <p className="mt-0.5 truncate text-xs text-white/35">{copy}</p>
                      </div>
                      <ChevronRight className="size-4 text-white/20" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Dernière analyse</p>
                      <p className="mt-1 text-xs text-white/35">16 septembre 2026 · 36 résultats</p>
                    </div>
                    <div className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[11px] text-emerald-300">Importée</div>
                  </div>
                  <div className="mt-6 flex h-16 items-end gap-2" aria-hidden="true">
                    {[30, 42, 35, 55, 48, 68, 58, 78, 70, 88].map((height, i) => (
                      <span key={i} className="flex-1 rounded-full bg-white/[0.08]">
                        <span className="block w-full rounded-full bg-white/60" style={{ height: `${height}%` }} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2ef]">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Une vision longitudinale</p>
              <h2 className="mt-5 max-w-[560px] text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl">
                Un résultat ne dit pas tout. <span className="text-neutral-400">La tendance, oui.</span>
              </h2>
              <p className="mt-6 max-w-[540px] text-base leading-7 text-neutral-500">
                Au lieu de regarder chaque PDF séparément, Baseline retrouve le même biomarqueur d’une année à l’autre et remet chaque valeur dans son contexte.
              </p>
              <div className="mt-9 grid grid-cols-2 gap-4">
                <div className="rounded-[22px] border border-black/[0.055] bg-white/65 p-5">
                  <Droplets className="size-5" />
                  <p className="mt-8 text-2xl font-semibold tracking-[-0.045em]">Ferritine</p>
                  <p className="mt-1 text-xs text-neutral-400">Évolution annuelle</p>
                </div>
                <div className="rounded-[22px] border border-black/[0.055] bg-white/65 p-5">
                  <HeartPulse className="size-5" />
                  <p className="mt-8 text-2xl font-semibold tracking-[-0.045em]">CRP</p>
                  <p className="mt-1 text-xs text-neutral-400">Tendance inflammatoire</p>
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-black/[0.055] bg-white/70 p-5 shadow-[0_25px_80px_rgba(0,0,0,.055)] backdrop-blur-xl sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["2022", "148", "Ferritine", "µg/L"],
                  ["2023", "172", "Ferritine", "µg/L"],
                  ["2024", "236", "Ferritine", "µg/L"],
                  ["2026", "490", "Ferritine", "µg/L"],
                ].map(([year, value, label, unit], index) => (
                  <div key={year} className={`rounded-[24px] border border-black/[0.05] p-5 ${index === 3 ? "bg-neutral-950 text-white" : "bg-[#f8f8f6]"}`}>
                    <p className={`text-xs ${index === 3 ? "text-white/40" : "text-neutral-400"}`}>{year}</p>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className={`mt-1 text-xs ${index === 3 ? "text-white/35" : "text-neutral-400"}`}>Dernière mesure comparable</p>
                      </div>
                      <p className="text-2xl font-semibold tracking-[-0.04em]">{value} <span className={`text-[11px] font-normal ${index === 3 ? "text-white/35" : "text-neutral-400"}`}>{unit}</span></p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[24px] bg-[#f8f8f6] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">La même donnée. Une autre lecture.</p>
                    <p className="mt-1 text-xs text-neutral-400">De valeurs isolées à une histoire biologique.</p>
                  </div>
                  <ArrowRight className="size-4 text-neutral-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-black/[0.05] bg-white/60">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Comment ça marche</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Simple à utiliser.<br />Profond quand tu en as besoin.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-neutral-500">Baseline commence par ce que tu possèdes déjà. Pas besoin de changer de laboratoire ni de refaire ton historique à la main.</p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {flow.map(({ number, title, copy, icon: Icon }) => (
              <div key={number} className="group min-h-[300px] rounded-[28px] border border-black/[0.055] bg-[#f7f7f4] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_60px_rgba(0,0,0,.055)] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{number}</span>
                  <div className="grid size-10 place-items-center rounded-full border border-black/[0.06] bg-white"><Icon className="size-4" /></div>
                </div>
                <div className="mt-24">
                  <h3 className="text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-500">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2ef]">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="overflow-hidden rounded-[36px] border border-black/[0.055] bg-[#e8e9e5]">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Prévention</p>
                <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-5xl">On ne devrait pas attendre d’avoir un problème pour penser à sa santé.</h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-neutral-500">Baseline te rappelle les contrôles oubliés et t’aide à préparer les sujets à aborder avec ton médecin.</p>
                <div className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm shadow-sm">
                  <CalendarDays className="size-4" />
                  Prochain sujet · contrôle dentaire
                </div>
              </div>

              <div className="relative min-h-[430px] overflow-hidden bg-neutral-950 p-7 text-white sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(114,145,255,.2),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(70,190,151,.16),transparent_32%)]" />
                <div className="relative mx-auto max-w-md">
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_26px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-[#fff0ef] text-[#c85b55]"><Stethoscope className="size-4" /></div>
                      <div>
                        <p className="text-sm font-medium">Dentiste</p>
                        <p className="mt-0.5 text-xs text-white/35">Dernière visite · septembre 2024</p>
                      </div>
                    </div>
                    <p className="mt-7 text-2xl font-medium leading-tight tracking-[-0.04em]">Cela fait 2 ans depuis ton dernier contrôle.</p>
                    <p className="mt-3 text-sm leading-6 text-white/45">Tu peux en parler à ton médecin ou organiser directement un rendez-vous de prévention.</p>
                    <div className="mt-8 flex gap-2">
                      <button className="rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-950">Marquer comme prévu</button>
                      <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60">Plus tard</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/65">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">Confiance</p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl">Ta santé reste ta santé.</h2>
              <p className="mt-6 max-w-lg text-sm leading-6 text-neutral-500">Baseline est conçu pour te donner le contrôle de tes données et ne remplace pas un professionnel de santé.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [LockKeyhole, "Contrôle", "Export et suppression de tes données."],
                [ShieldCheck, "Confidentialité", "Une architecture pensée pour les données sensibles."],
                [Stethoscope, "Médecin", "Le professionnel de santé reste la référence."],
              ].map(([Icon, title, copy]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={String(title)} className="rounded-[24px] border border-black/[0.055] bg-[#f6f6f3] p-5">
                    <I className="size-5" />
                    <p className="mt-10 text-sm font-medium">{String(title)}</p>
                    <p className="mt-2 text-xs leading-5 text-neutral-400">{String(copy)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0c0d0f] text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-24 text-center lg:px-10 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">Prends le fil de ta santé</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Ton histoire de santé mérite mieux qu’un dossier Downloads.</h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/45">Commence avec les analyses et documents que tu possèdes déjà.</p>
          <Link
            href="/signup"
            className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950"
          >
            Découvrir Baseline <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#0c0d0f] text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 border-t border-white/[0.07] px-6 py-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex items-center gap-4"><Brand inverse /><span>Le fil de votre santé.</span></div>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy">Confidentialité</Link>
            <Link href="/terms">Conditions</Link>
            <Link href="/legal-notice">Mentions légales</Link>
            <Link href="/medical-disclaimer">Information médicale</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
