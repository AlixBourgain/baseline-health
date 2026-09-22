import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Droplets,
  Eye,
  FileText,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

const years = [
  { year: "2022", value: 148 },
  { year: "2023", value: 172 },
  { year: "2024", value: 236 },
  { year: "2025", value: 318 },
  { year: "2026", value: 490 },
];

export function DesignCodeHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(77,106,255,.16),transparent_26%),radial-gradient(circle_at_20%_100%,rgba(255,255,255,.055),transparent_28%)]" />

      <header className="relative z-30 border-b border-white/[0.06]">
        <div className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-[22px] font-medium tracking-[-0.045em] text-white">
            baseline<span className="align-top text-[14px]">*</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] text-white/45 md:flex">
            <a href="#vision" className="transition hover:text-white">Vision</a>
            <a href="#biomarkers" className="transition hover:text-white">Biomarqueurs</a>
            <a href="#how" className="transition hover:text-white">Comment ça marche</a>
            <Link href="/privacy" className="transition hover:text-white">Sécurité</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden px-4 py-2 text-sm text-white/50 sm:inline-flex">Connexion</Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
            >
              Commencer <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-20 pt-18 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="max-w-[590px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.045] px-3.5 py-2 text-[11px] font-medium text-white/50 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Votre santé, dans le temps
            </div>

            <h1 className="mt-7 text-[clamp(3.9rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.073em]">
              Toute ta santé.
              <span className="mt-1 block text-white/38">Enfin lisible.</span>
            </h1>

            <p className="mt-7 max-w-[560px] text-[17px] leading-8 text-white/46 sm:text-[18px]">
              Baseline rassemble analyses, rendez-vous, symptômes et documents pour reconstruire une histoire de santé continue — sans te demander de tout retenir.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 shadow-[0_10px_28px_rgba(255,255,255,.08)] transition hover:-translate-y-0.5"
              >
                Découvrir Baseline <ArrowRight className="size-4" />
              </Link>

              <a
                href="#biomarkers"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-6 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
              >
                Voir l’évolution
              </a>
            </div>

            <div className="mt-10 grid max-w-[500px] grid-cols-3 gap-5 border-t border-white/[0.07] pt-6">
              <div>
                <p className="text-sm font-medium text-white/80">36</p>
                <p className="mt-1 text-[11px] leading-4 text-white/28">résultats structurés</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">5 ans</p>
                <p className="mt-1 text-[11px] leading-4 text-white/28">d’historique relié</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">1 vue</p>
                <p className="mt-1 text-[11px] leading-4 text-white/28">pour suivre l’évolution</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-10 -inset-y-12 bg-[radial-gradient(circle_at_50%_50%,rgba(88,112,255,.12),transparent_52%)] blur-2xl" />

            <div className="relative mx-auto max-w-[720px]">
              <div className="rotate-[1.5deg] rounded-[34px] border border-white/[0.08] bg-[#121316] p-3 shadow-[0_45px_120px_rgba(0,0,0,.5)]">
                <div className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#17181c]">
                  <div className="flex h-11 items-center justify-between border-b border-white/[0.06] px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-white/12" />
                      <span className="size-2 rounded-full bg-white/12" />
                      <span className="size-2 rounded-full bg-white/12" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">Baseline health OS</p>
                    <div className="size-5 rounded-full bg-white/[0.06]" />
                  </div>

                  <div className="grid min-h-[470px] lg:grid-cols-[170px_1fr]">
                    <aside className="hidden border-r border-white/[0.055] bg-black/10 p-5 lg:block">
                      <p className="text-[19px] font-medium tracking-[-0.04em]">baseline*</p>
                      <div className="mt-9 space-y-2 text-[11px] text-white/28">
                        <div className="rounded-xl bg-white/[0.07] px-3 py-2.5 text-white/75">Accueil</div>
                        <div className="px-3 py-2.5">Ma santé</div>
                        <div className="px-3 py-2.5">Documents</div>
                        <div className="px-3 py-2.5">Analyses</div>
                        <div className="px-3 py-2.5">Timeline</div>
                      </div>
                    </aside>

                    <div className="p-5 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] text-white/24">Mardi 22 septembre</p>
                          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.045em]">Bonjour Alex</h3>
                          <p className="mt-1 text-xs text-white/32">Voici ce qui mérite ton attention.</p>
                        </div>
                        <div className="grid size-9 place-items-center rounded-full bg-white/[0.06] text-[11px] text-white/60">AB</div>
                      </div>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {[
                          [Stethoscope, "Dentiste", "Dernière visite il y a 2 ans", "bg-[#2b1c1c] text-[#e69b93]"],
                          [Activity, "Douleur au dos", "Signalée depuis 3 semaines", "bg-[#2b2119] text-[#df9d68]"],
                          [Droplets, "Bilan sanguin", "36 marqueurs analysés", "bg-[#172722] text-[#8dd3b9]"],
                          [Eye, "Ophtalmologue", "Contrôle à planifier", "bg-[#1b2130] text-[#9bb8f2]"],
                        ].map(([Icon, title, copy, tone]) => {
                          const I = Icon as typeof Stethoscope;
                          return (
                            <div key={String(title)} className="flex items-center gap-3 rounded-[18px] border border-white/[0.06] bg-white/[0.025] p-3.5">
                              <div className={`grid size-9 shrink-0 place-items-center rounded-xl ${String(tone)}`}><I className="size-4" /></div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-white/88">{String(title)}</p>
                                <p className="mt-0.5 truncate text-[11px] text-white/28">{String(copy)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 rounded-[20px] border border-white/[0.06] bg-black/10 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">Ferritine</p>
                            <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">490 <span className="text-[11px] font-normal text-white/28">µg/L</span></p>
                          </div>
                          <div className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[10px] text-white/28">Référence 30–300</div>
                        </div>

                        <div className="relative mt-5 h-[150px] overflow-hidden rounded-[14px] bg-white/[0.02]">
                          <div className="absolute inset-x-0 bottom-[28%] top-[18%] bg-emerald-300/[0.045]" />
                          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 150" preserveAspectRatio="none" aria-label="Évolution de la ferritine">
                            <path d="M0 120 C82 118 112 103 160 100 C224 96 254 84 310 72 C370 60 404 40 450 34 C483 30 505 18 520 14" fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="2.6" strokeLinecap="round" />
                            {years.map((point, index) => {
                              const coords = [["0","120"],["160","100"],["310","72"],["450","34"],["520","14"]][index];
                              return <circle key={point.year} cx={coords[0]} cy={coords[1]} r="4" fill="#17181c" stroke="#fff" strokeWidth="2" />;
                            })}
                          </svg>
                          <div className="absolute inset-x-0 bottom-2 flex justify-between px-1 text-[9px] text-white/20">
                            {years.map((point) => <span key={point.year}>{point.year}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden w-[220px] -rotate-[4deg] rounded-[22px] border border-white/[0.08] bg-[#141519] p-4 shadow-[0_25px_70px_rgba(0,0,0,.42)] lg:block">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-[#172722] text-[#8dd3b9]"><HeartPulse className="size-4" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/22">Tendance</p>
                    <p className="mt-1 text-sm font-medium text-white/80">5 années reliées</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 top-16 hidden w-[200px] rotate-[5deg] rounded-[22px] border border-white/[0.08] bg-white/[0.055] p-4 shadow-[0_24px_70px_rgba(0,0,0,.38)] backdrop-blur-2xl xl:block">
                <CalendarDays className="size-4 text-white/55" />
                <p className="mt-6 text-sm font-medium text-white/82">Contrôle dentaire</p>
                <p className="mt-1 text-[11px] leading-4 text-white/28">Dernière visite il y a 2 ans</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.06] pt-6 text-[10px] uppercase tracking-[0.17em] text-white/20">
          <span>Historique longitudinal</span>
          <span>Analyses biologiques</span>
          <span>Prévention</span>
          <span>Documents de santé</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_bottom,transparent,#f2f2ef)]" />
    </section>
  );
}
