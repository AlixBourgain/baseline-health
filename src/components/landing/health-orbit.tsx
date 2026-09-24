"use client";

import { useMemo, useRef } from "react";
import { Activity, Droplets, Eye, HeartPulse, Stethoscope } from "lucide-react";

const cards = [
  { icon: Droplets, eyebrow: "Biologie", title: "Bilan sanguin", detail: "36 marqueurs reliés", pos: "left-[7%] top-[58%]", tilt: "-rotate-[5deg]" },
  { icon: Stethoscope, eyebrow: "Prévention", title: "Dentiste", detail: "Dernière visite · 2 ans", pos: "left-[17%] top-[19%]", tilt: "rotate-[3deg]" },
  { icon: Activity, eyebrow: "Symptôme", title: "Douleur au dos", detail: "Depuis 3 semaines", pos: "right-[8%] top-[22%]", tilt: "-rotate-[3deg]" },
  { icon: Eye, eyebrow: "Suivi", title: "Ophtalmo", detail: "Contrôle à planifier", pos: "right-[14%] top-[64%]", tilt: "rotate-[4deg]" },
];

export function HealthOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 76 }, (_, index) => {
        const angle = (index / 76) * Math.PI * 2;
        const radius = 66 + ((index * 19) % 96);
        const x = 50 + Math.cos(angle) * (radius / 4.15);
        const y = 50 + Math.sin(angle) * (radius / 5.45);
        const size = 1.3 + ((index * 7) % 5) * 0.55;
        const delay = -((index * 113) % 2600);
        return { x, y, size, delay };
      }),
    []
  );

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    root.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    root.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    root.style.setProperty("--rx", `${(((event.clientY - rect.top) / rect.height) - 0.5) * -7}deg`);
    root.style.setProperty("--ry", `${(((event.clientX - rect.left) / rect.width) - 0.5) * 9}deg`);
  }

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className="baseline-orbit relative mx-auto mt-12 h-[560px] w-full max-w-[1180px] overflow-hidden rounded-[38px] border border-white/10 bg-[#050506] shadow-[0_45px_150px_rgba(0,0,0,.34)] sm:h-[600px]"
    >
      <div className="baseline-orbit-grid absolute inset-0" />
      <div className="baseline-orbit-glow absolute inset-0" />

      <div className="absolute left-6 top-6 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 text-[11px] text-white/65 backdrop-blur-2xl sm:left-8 sm:top-8">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.9)]" />
        Baseline health graph
      </div>

      <div className="absolute right-6 top-6 z-30 hidden rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[11px] text-white/45 backdrop-blur-2xl sm:block">
        Démo · 2022—2026
      </div>

      <div className="baseline-orbit-stage absolute inset-0 grid place-items-center">
        <div className="relative grid size-[320px] place-items-center sm:size-[390px]">
          <div className="baseline-orbit-halo absolute inset-0 rounded-full" />
          <div className="baseline-orbit-ring absolute inset-[3%] rounded-full border border-white/10" />
          <div className="baseline-orbit-ring baseline-orbit-ring-b absolute inset-[14%] rounded-full border border-white/10" />
          <div className="baseline-orbit-ring baseline-orbit-ring-c absolute inset-[27%] rounded-full border border-white/[0.08]" />

          <div className="baseline-core relative grid size-32 place-items-center rounded-full border border-white/15 bg-white/[0.08] shadow-[0_0_100px_rgba(225,235,255,.34)] backdrop-blur-2xl">
            <div className="absolute inset-3 rounded-full border border-white/10" />
            <HeartPulse className="size-7 text-white/90" />
          </div>

          {particles.map((particle, index) => (
            <span
              key={index}
              className="baseline-particle absolute rounded-full bg-white"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 translate-y-[154px] items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] text-white/50 backdrop-blur-xl sm:flex">
        <span className="baseline-status-dot size-1.5 rounded-full bg-white" />
        Relier ton historique
      </div>

      {cards.map(({ icon: Icon, eyebrow, title, detail, pos, tilt }) => (
        <div key={title} className={`absolute z-20 hidden w-[220px] ${pos} ${tilt} sm:block`}>
          <div className="baseline-glass-card rounded-[22px] border border-white/10 bg-white/[0.065] p-4 text-left backdrop-blur-2xl">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.08]">
                <Icon className="size-4 text-white/85" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{eyebrow}</p>
                <p className="mt-1 text-sm font-medium text-white">{title}</p>
                <p className="mt-1 truncate text-xs text-white/45">{detail}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-5 bottom-5 z-20 grid grid-cols-2 gap-2 sm:hidden">
        {cards.map(({ icon: Icon, title }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Icon className="size-3.5 text-white/70" />
              <span className="text-[11px] text-white/70">{title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-7 left-8 hidden items-center gap-5 text-[10px] uppercase tracking-[0.18em] text-white/25 sm:flex">
        <span>Analyses</span><span>Consultations</span><span>Symptômes</span><span>Prévention</span>
      </div>

      <div className="absolute bottom-7 right-8 hidden max-w-[280px] text-right sm:block">
        <p className="text-sm font-medium text-white/85">Une mémoire de santé vivante.</p>
        <p className="mt-1 text-xs leading-5 text-white/35">Chaque signal retrouve sa place dans le temps.</p>
      </div>
    </div>
  );
}
