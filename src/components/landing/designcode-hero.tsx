import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Droplets,
  FileText,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";

const orbitCards = [
  {
    icon: Droplets,
    eyebrow: "Analyses sanguines",
    title: "Ferritine",
    value: "32 ng/mL",
    meta: "12 janv. 2024",
    className: "left-[4%] top-[11%] -rotate-[3deg]",
  },
  {
    icon: CalendarDays,
    eyebrow: "Rendez-vous",
    title: "Dermatologue",
    value: "Contrôle annuel",
    meta: "3 avr. 2024",
    className: "right-[3%] top-[8%] rotate-[2deg]",
  },
  {
    icon: Activity,
    eyebrow: "Symptômes",
    title: "Fatigue",
    value: "Plus présente en fin de journée",
    meta: "14 févr. 2024",
    className: "left-[1%] bottom-[16%] rotate-[2deg]",
  },
  {
    icon: FileText,
    eyebrow: "Documents",
    title: "Compte rendu",
    value: "IRM genou",
    meta: "12 mars 2024",
    className: "right-[1%] bottom-[14%] -rotate-[2deg]",
  },
];

export function DesignCodeHero() {
  return (
    <>
      <section className="relative min-h-[940px] overflow-hidden bg-[#05070b] text-white">
        <img
          src="/landing/baseline-landscape.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,8,.92)_0%,rgba(5,6,9,.58)_42%,rgba(5,6,9,.16)_70%,rgba(5,6,9,.38)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(to_bottom,rgba(4,5,8,.94),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_top,#05070b_12%,transparent)]" />

        <div className="relative z-30 mx-auto mt-4 flex h-[62px] max-w-[1360px] items-center justify-between rounded-[22px] border border-white/[0.08] bg-black/20 px-6 shadow-[0_12px_40px_rgba(0,0,0,.22)] backdrop-blur-2xl lg:px-7">
          <Link href="/" className="text-[24px] font-medium tracking-[-0.045em] text-white">
            baseline<span className="align-top text-[14px]">*</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] text-white/56 md:flex">
            <a href="#problem" className="transition hover:text-white">Pourquoi</a>
            <a href="#biomarkers" className="transition hover:text-white">Biomarqueurs</a>
            <a href="#how" className="transition hover:text-white">Comment ça marche</a>
            <Link href="/privacy" className="transition hover:text-white">Sécurité</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden px-4 py-2 text-sm text-white/58 sm:inline-flex">Connexion</Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5"
            >
              Créer mon espace <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1360px] gap-12 px-6 pb-24 pt-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-20">
          <div className="max-w-[590px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/38">
              Vos données. Un meilleur vous.
            </p>

            <h1 className="mt-6 text-[clamp(3.5rem,5.4vw,5.7rem)] font-semibold leading-[0.91] tracking-[-0.068em]">
              Toute ta santé.
              <span className="block bg-[linear-gradient(100deg,#ffffff_5%,#9db0ff_55%,#9ee4d0_100%)] bg-clip-text text-transparent">
                Enfin connectée.
              </span>
            </h1>

            <h2 className="mt-5 max-w-[560px] text-[clamp(1.9rem,3vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-white/34">
              Comprendre aujourd’hui.
              <span className="block">Vivre mieux demain.</span>
            </h2>

            <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-white/56 sm:text-[17px]">
              Baseline rassemble tes analyses, rendez-vous, symptômes et documents pour te donner une vision claire et continue de ta santé, dans le temps.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 shadow-[0_12px_32px_rgba(255,255,255,.12)] transition hover:-translate-y-0.5"
              >
                Créer mon espace <ArrowRight className="size-4" />
              </Link>
              <a
                href="#how"
                className="inline-flex h-12 items-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.03] px-6 text-sm font-medium text-white/74 backdrop-blur-xl transition hover:bg-white/[0.06] hover:text-white"
              >
                <span className="grid size-6 place-items-center rounded-full border border-white/[0.14]">
                  <ArrowRight className="size-3.5" />
                </span>
                Voir comment ça marche
              </a>
            </div>

            <div className="mt-9 grid max-w-[560px] grid-cols-3 gap-5">
              {[
                [LockKeyhole, "Sécurisé dès la conception"],
                [UserRound, "Pensé pour vous et vos proches"],
                [HeartPulse, "Une vision claire dans la durée"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof LockKeyhole;
                return (
                  <div key={String(label)} className="flex items-center gap-2 text-[11px] leading-4 text-white/40">
                    <I className="size-4 shrink-0 text-white/60" />
                    <span>{String(label)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[570px]">
            <div className="absolute left-1/2 top-1/2 size-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.12] bg-[radial-gradient(circle_at_38%_34%,rgba(255,255,255,.18),rgba(75,91,151,.13)_30%,rgba(7,9,14,.5)_70%)] shadow-[0_0_90px_rgba(105,126,255,.18),inset_0_0_70px_rgba(255,255,255,.03)] backdrop-blur-xl sm:size-[390px]">
              <div className="absolute inset-[12%] rounded-full border border-white/[0.08]" />
              <div className="absolute inset-[25%] rounded-full border border-white/[0.06]" />
              <div className="absolute inset-0 animate-[spin_26s_linear_infinite] rounded-full border border-dashed border-white/[0.08]" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <p className="text-4xl font-medium tracking-[-0.06em]">baseline*</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-white/35">Votre santé connectée</p>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.06] rotate-[20deg]" />
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.05] -rotate-[26deg]" />

            {orbitCards.map(({ icon: Icon, eyebrow, title, value, meta, className }) => (
              <div
                key={eyebrow}
                className={`absolute hidden w-[220px] rounded-[22px] border border-white/[0.14] bg-[linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.045))] p-4 shadow-[0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-2xl sm:block ${className}`}
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.07]">
                    <Icon className="size-4 text-white/78" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/34">{eyebrow}</p>
                    <p className="mt-1 text-sm font-medium text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/58">{value}</p>
                    <p className="mt-1 text-[10px] text-white/28">{meta}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute right-[2%] top-[46%] hidden max-w-[170px] -rotate-[8deg] text-[22px] font-medium italic leading-tight tracking-[-0.04em] text-white/42 xl:block">
              Une histoire
              <span className="block">plus claire</span>
              <span className="block">de ta santé</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col items-center px-6 pb-6 text-white/36">
          <p className="text-[10px] uppercase tracking-[0.24em]">Fais défiler pour découvrir</p>
          <ArrowDown className="mt-3 size-4 animate-bounce" />
        </div>
      </section>

      <section id="biomarkers" className="relative overflow-hidden bg-[#05070b] text-white">
        <img
          src="/landing/baseline-landscape.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#05070b_0%,rgba(5,7,11,.78)_30%,#05070b_100%)]" />

        <div className="relative mx-auto grid max-w-[1360px] gap-12 px-6 py-24 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/34">Biomarqueurs</p>
            <h2 className="mt-5 max-w-[520px] text-[clamp(2.8rem,4.7vw,5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              Voyez l’évolution
              <span className="block text-white/36">de vos marqueurs.</span>
            </h2>
            <p className="mt-6 max-w-[500px] text-[16px] leading-7 text-white/48">
              Des tendances claires pour mieux comprendre aujourd’hui et suivre ce qui évolue année après année.
            </p>
            <Link href="/signup" className="mt-7 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm font-medium text-white/82">
              En savoir plus <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
            <div className="rounded-[28px] border border-white/[0.12] bg-[linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.025))] p-5 shadow-[0_28px_90px_rgba(0,0,0,.34)] backdrop-blur-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Droplets className="size-4 text-[#a9bdff]" />
                    <p className="text-sm font-medium">Ferritine</p>
                  </div>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">32 <span className="text-xs font-normal text-white/34">ng/mL</span></p>
                </div>
                <p className="max-w-[170px] text-right text-xs leading-5 text-white/35">Une vision dans le temps pour aller plus loin.</p>
              </div>

              <div className="relative mt-7 h-[210px] overflow-hidden rounded-[18px] bg-black/10">
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.04]" />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 210" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bioLine" x1="0" x2="1">
                      <stop offset="0%" stopColor="#93a9ff" />
                      <stop offset="100%" stopColor="#b4eadb" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 158 C82 156 122 137 190 133 C268 128 315 143 372 124 C440 101 486 118 536 97 C605 68 670 84 760 50"
                    fill="none"
                    stroke="url(#bioLine)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {[
                    ["70","151"],["210","132"],["365","125"],["510","104"],["620","82"],["735","56"],
                  ].map(([cx, cy], index) => (
                    <circle key={index} cx={cx} cy={cy} r="4.5" fill="#0b0d12" stroke="#b9c6ff" strokeWidth="2" />
                  ))}
                </svg>
                <div className="absolute inset-x-0 bottom-3 flex justify-between px-4 text-[10px] text-white/22">
                  {["2022","2023","2024","2025","2026"].map((year) => <span key={year}>{year}</span>)}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                ["CRP","1,2","mg/L"],
                ["Vitamine D","54","ng/mL"],
              ].map(([name, value, unit]) => (
                <div key={name} className="rounded-[24px] border border-white/[0.1] bg-white/[0.04] p-5 backdrop-blur-xl">
                  <p className="text-sm text-white/70">{name}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{value} <span className="text-[11px] font-normal text-white/30">{unit}</span></p>
                  <div className="mt-8 h-9">
                    <svg className="h-full w-full" viewBox="0 0 120 36" preserveAspectRatio="none">
                      <path d="M0 27 C20 28 28 18 42 19 C60 20 70 10 82 13 C98 16 104 7 120 8" fill="none" stroke="#9eb5ff" strokeOpacity=".75" strokeWidth="1.6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
