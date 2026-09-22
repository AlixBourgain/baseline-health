"use client";

import Link from "next/link";
import { useRef } from "react";
import { Activity, ArrowRight, Droplets, Eye, HeartPulse, Stethoscope } from "lucide-react";

const nodes = [
  { label: "Ferritine", value: "490", unit: "µg/L", icon: Droplets, className: "left-[8%] top-[22%] -rotate-[6deg]" },
  { label: "CRP", value: "8,7", unit: "mg/L", icon: HeartPulse, className: "right-[7%] top-[18%] rotate-[5deg]" },
  { label: "Dentiste", value: "2 ans", unit: "dernier contrôle", icon: Stethoscope, className: "left-[3%] bottom-[18%] rotate-[4deg]" },
  { label: "Ophtalmo", value: "À planifier", unit: "prévention", icon: Eye, className: "right-[4%] bottom-[16%] -rotate-[4deg]" },
];

export function DesignCodeHero() {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const root = ref.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    root.style.setProperty("--hx", `${px * 100}%`);
    root.style.setProperty("--hy", `${py * 100}%`);
    root.style.setProperty("--hrx", `${(0.5 - py) * 5}deg`);
    root.style.setProperty("--hry", `${(px - 0.5) * 7}deg`);
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className="dc-hero relative min-h-[860px] overflow-hidden bg-[#07080b] text-white"
    >
      <div className="dc-hero-noise absolute inset-0" />
      <div className="dc-hero-glow absolute inset-0" />
      <div className="dc-hero-grid absolute inset-0" />

      <div className="relative z-20 mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-[22px] font-medium tracking-[-0.045em] text-white">
          baseline<span className="align-top text-[14px]">*</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-white/55 md:flex">
          <a href="#vision" className="transition hover:text-white">Vision</a>
          <a href="#biomarkers" className="transition hover:text-white">Biomarqueurs</a>
          <a href="#how" className="transition hover:text-white">Comment ça marche</a>
          <Link href="/privacy" className="transition hover:text-white">Sécurité</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden px-4 py-2 text-sm text-white/60 sm:inline-flex">Connexion</Link>
          <Link
            href="/signup"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white px-5 text-sm font-medium text-neutral-950 shadow-[0_8px_30px_rgba(255,255,255,.1)] transition hover:-translate-y-0.5"
          >
            Commencer <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1320px] gap-12 px-6 pb-20 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-20">
        <div className="relative z-20 max-w-[620px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 text-[11px] font-medium text-white/55 backdrop-blur-2xl">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.9)]" />
            Votre santé, dans le temps
          </div>

          <h1 className="mt-7 text-[clamp(3.8rem,6.2vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.072em]">
            Toute ta santé.
            <span className="mt-1 block bg-[linear-gradient(110deg,#ffffff_10%,#9ca9ff_52%,#bfe7dd_88%)] bg-clip-text text-transparent">
              Enfin reliée.
            </span>
          </h1>

          <p className="mt-7 max-w-[570px] text-[17px] leading-8 text-white/48 sm:text-[18px]">
            Baseline transforme tes analyses, rendez-vous, symptômes et documents en une histoire de santé claire, suivie année après année.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 shadow-[0_10px_32px_rgba(255,255,255,.10)] transition hover:-translate-y-0.5"
            >
              Découvrir Baseline <ArrowRight className="size-4" />
            </Link>
            <a
              href="#biomarkers"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-6 text-sm font-medium text-white/72 backdrop-blur-xl transition hover:bg-white/[0.09] hover:text-white"
            >
              Voir l’évolution
            </a>
          </div>

          <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/30">
            <span>Historique longitudinal</span>
            <span>Prévention</span>
            <span>Biomarqueurs</span>
          </div>
        </div>

        <div className="dc-stage relative h-[560px] lg:h-[650px]">
          <div className="dc-stage-inner absolute inset-0">
            <div className="dc-aura absolute left-1/2 top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-[470px]" />
            <div className="dc-ring dc-ring-a absolute left-1/2 top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:size-[470px]" />
            <div className="dc-ring dc-ring-b absolute left-1/2 top-1/2 size-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] sm:size-[350px]" />

            <div className="dc-orb absolute left-1/2 top-1/2 grid size-[210px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 sm:size-[250px]">
              <div className="dc-orb-inner absolute inset-[13%] rounded-full border border-white/10" />
              <div className="relative text-center">
                <Activity className="mx-auto size-6 text-white/80" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/35">Baseline</p>
                <p className="mt-2 text-xl font-medium tracking-[-0.04em]">Ton health graph</p>
              </div>
            </div>

            {nodes.map(({ label, value, unit, icon: Icon, className }) => (
              <div key={label} className={`dc-float-card absolute hidden w-[205px] rounded-[22px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_24px_70px_rgba(0,0,0,.32)] backdrop-blur-2xl sm:block ${className}`}>
                <div className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.075]">
                    <Icon className="size-4 text-white/80" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">{label}</p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-white">{value}</p>
                    <p className="mt-0.5 text-[11px] text-white/35">{unit}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="dc-chart-card absolute bottom-[4%] left-1/2 w-[86%] max-w-[560px] -translate-x-1/2 rounded-[26px] border border-white/10 bg-[#0d1016]/78 p-5 shadow-[0_30px_90px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.17em] text-white/30">Ferritine</p>
                  <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">490 <span className="text-xs font-normal text-white/35">µg/L</span></p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] text-white/40">2022 → 2026</div>
              </div>

              <svg className="mt-5 h-[130px] w-full overflow-visible" viewBox="0 0 520 130" preserveAspectRatio="none" aria-label="Évolution de la ferritine">
                <defs>
                  <linearGradient id="dcLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#70d6b5" />
                    <stop offset="52%" stopColor="#a7b2ff" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                  <linearGradient id="dcArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a7b2ff" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#a7b2ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 108 C72 104 100 92 145 92 C200 92 225 82 270 74 C335 62 360 42 410 38 C462 34 485 17 520 12 L520 130 L0 130 Z" fill="url(#dcArea)" />
                <path d="M0 108 C72 104 100 92 145 92 C200 92 225 82 270 74 C335 62 360 42 410 38 C462 34 485 17 520 12" fill="none" stroke="url(#dcLine)" strokeWidth="3" strokeLinecap="round" />
                {[["0","108"],["145","92"],["270","74"],["410","38"],["520","12"]].map(([cx,cy], index) => (
                  <circle key={index} cx={cx} cy={cy} r="4.5" fill="#0d1016" stroke="#fff" strokeWidth="2" />
                ))}
              </svg>
              <div className="mt-1 flex justify-between text-[10px] text-white/25"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,#f2f2ef)]" />
    </section>
  );
}
