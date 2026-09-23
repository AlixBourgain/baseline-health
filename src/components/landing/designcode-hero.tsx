"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Droplets,
  FileText,
  Stethoscope,
} from "lucide-react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const stage = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));

export function DesignCodeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      setProgress(clamp(-rect.top / scrollable));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const intro = 1 - stage(progress, 0.08, 0.3);
  const fragments = stage(progress, 0.12, 0.42) * (1 - stage(progress, 0.48, 0.68));
  const timeline = stage(progress, 0.34, 0.67);
  const final = stage(progress, 0.64, 0.92);

  return (
    <section ref={sectionRef} className="relative h-[285vh] bg-[#08090b] text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(83,103,255,.13),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(140,197,179,.07),transparent_24%),linear-gradient(180deg,#08090b_0%,#0b0c10_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 68% 48%, black 0%, transparent 68%)",
          }}
        />

        <header className="relative z-40">
          <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
            <Link href="/" className="text-[22px] font-medium tracking-[-0.045em] text-white">
              baseline<span className="align-top text-[14px]">*</span>
            </Link>

            <nav className="hidden items-center gap-8 text-[13px] text-white/42 md:flex">
              <a href="#problem" className="transition hover:text-white">Pourquoi</a>
              <a href="#biomarkers" className="transition hover:text-white">Biomarqueurs</a>
              <a href="#how" className="transition hover:text-white">Comment ça marche</a>
              <Link href="/privacy" className="transition hover:text-white">Sécurité</Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden px-4 py-2 text-sm text-white/46 sm:inline-flex">Connexion</Link>
              <Link
                href="/signup"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
              >
                Créer mon espace <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto h-[calc(100vh-72px)] max-w-[1320px] px-6 lg:px-10">
          <div className="absolute inset-x-6 top-[10%] lg:inset-x-10 lg:top-[13%]">
            <div
              className="max-w-[690px] transition-[opacity,transform] duration-150"
              style={{
                opacity: intro,
                transform: `translateY(${(1 - intro) * -28}px)`,
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.045] px-3.5 py-2 text-[11px] font-medium text-white/50 backdrop-blur-xl">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Ton historique santé, enfin exploitable
              </div>

              <h1
                className="mt-7 max-w-[670px] text-[clamp(3.1rem,5vw,5rem)] font-semibold leading-[0.94] tracking-[-0.065em]"
                style={{ textWrap: "balance" }}
              >
                Toute ta santé.
                <span className="block text-white/34">Enfin reliée.</span>
              </h1>

              <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-white/44 sm:text-[18px] sm:leading-8">
                Baseline rassemble ce que tu as déjà — analyses, rendez-vous, symptômes, documents — pour te redonner une vision claire dans le temps.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5"
                >
                  Créer mon espace santé <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#how"
                  className="inline-flex h-12 items-center rounded-full border border-white/[0.09] bg-white/[0.03] px-6 text-sm font-medium text-white/68 transition hover:bg-white/[0.055] hover:text-white"
                >
                  Voir comment ça marche
                </a>
              </div>
            </div>
          </div>

          <div
            className="absolute left-1/2 top-[58%] w-[min(860px,88vw)] -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%,-50%) scale(${0.88 + timeline * 0.12})`,
            }}
          >
            <div className="relative h-[360px] sm:h-[420px]">
              <div
                className="absolute inset-x-[10%] top-1/2 h-px origin-left bg-white/[0.12]"
                style={{ transform: `scaleX(${Math.max(timeline, 0.03)})` }}
              />

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 420" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="storyLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#8fd7bd" />
                    <stop offset="52%" stopColor="#aeb8ff" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <path
                  d="M70 284 C170 276 210 246 300 238 C402 229 462 206 545 175 C645 139 700 112 820 102"
                  fill="none"
                  stroke="url(#storyLine)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - timeline}
                  opacity={0.88}
                />
              </svg>

              {[
                { x: "8%", y: "67%", year: "2022", label: "Premières analyses" },
                { x: "31%", y: "57%", year: "2023", label: "Suivi annuel" },
                { x: "53%", y: "46%", year: "2024", label: "Nouveaux documents" },
                { x: "72%", y: "31%", year: "2025", label: "Tendance détectée" },
                { x: "91%", y: "24%", year: "2026", label: "Aujourd’hui" },
              ].map((point, index) => {
                const local = stage(timeline, index * 0.17, 0.32 + index * 0.17);
                return (
                  <div
                    key={point.year}
                    className="absolute"
                    style={{ left: point.x, top: point.y, opacity: local, transform: `translate(-50%,-50%) scale(${0.82 + local * 0.18})` }}
                  >
                    <div className="size-3 rounded-full border-2 border-white bg-[#0b0c10] shadow-[0_0_0_6px_rgba(255,255,255,.035)]" />
                    <div className="mt-4 -translate-x-[42%] whitespace-nowrap">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/26">{point.year}</p>
                      <p className="mt-1 text-[12px] text-white/55">{point.label}</p>
                    </div>
                  </div>
                );
              })}

              <div
                className="absolute left-[18%] top-[18%] w-[210px] rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl"
                style={{
                  opacity: fragments,
                  transform: `translateY(${(1 - fragments) * 28}px) rotate(-4deg)`,
                }}
              >
                <FileText className="size-4 text-white/45" />
                <p className="mt-8 text-sm font-medium text-white/82">Bilan sanguin.pdf</p>
                <p className="mt-1 text-[11px] text-white/28">16 septembre 2026</p>
              </div>

              <div
                className="absolute right-[13%] top-[18%] w-[210px] rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl"
                style={{
                  opacity: fragments,
                  transform: `translateY(${(1 - fragments) * -24}px) rotate(4deg)`,
                }}
              >
                <CalendarDays className="size-4 text-white/45" />
                <p className="mt-8 text-sm font-medium text-white/82">Dentiste</p>
                <p className="mt-1 text-[11px] text-white/28">Dernière visite · 2 ans</p>
              </div>

              <div
                className="absolute bottom-[7%] left-[42%] w-[220px] rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl"
                style={{
                  opacity: fragments,
                  transform: `translateY(${(1 - fragments) * 34}px) rotate(2deg)`,
                }}
              >
                <Droplets className="size-4 text-white/45" />
                <p className="mt-8 text-sm font-medium text-white/82">Ferritine</p>
                <p className="mt-1 text-[11px] text-white/28">Une valeur. Puis une tendance.</p>
              </div>

              <div
                className="absolute right-[4%] bottom-[8%] w-[210px] rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl"
                style={{
                  opacity: final,
                  transform: `translateY(${(1 - final) * 30}px)`,
                }}
              >
                <Stethoscope className="size-4 text-white/45" />
                <p className="mt-8 text-sm font-medium text-white/82">À suivre</p>
                <p className="mt-1 text-[11px] text-white/28">Un sujet à aborder avec ton médecin.</p>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-x-6 bottom-[10%] text-center transition-[opacity,transform] duration-150 lg:inset-x-10"
            style={{
              opacity: final,
              transform: `translateY(${(1 - final) * 24}px)`,
            }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/24">Ce que Baseline te donne</p>
            <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(2.4rem,4.4vw,4.3rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Moins de choses à retenir.
              <span className="block text-white/34">Plus de choses à comprendre.</span>
            </h2>
            <div className="mt-7 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5"
              >
                Créer mon espace santé <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-white/18">
            Scroll pour découvrir
          </div>
        </div>
      </div>
    </section>
  );
}
