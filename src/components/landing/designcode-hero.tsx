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

const years = ["2022", "2023", "2024", "2025", "2026"];

export function DesignCodeHero() {
  return (
    <section className="relative overflow-hidden bg-[#080809] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(88,108,255,.12),transparent_24%),radial-gradient(circle_at_18%_72%,rgba(255,255,255,.04),transparent_30%)]" />

      <header className="relative z-30">
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

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-24 pt-16 lg:px-10 lg:pb-30 lg:pt-22">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="max-w-[600px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.045] px-3.5 py-2 text-[11px] font-medium text-white/52 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Ton historique santé, enfin exploitable
            </div>

            <h1 className="mt-7 text-[clamp(3.7rem,5.8vw,6.3rem)] font-semibold leading-[0.92] tracking-[-0.072em]">
              Tu ne devrais pas avoir à te souvenir
              <span className="block text-white/34">de toute ta santé.</span>
            </h1>

            <p className="mt-7 max-w-[570px] text-[17px] leading-8 text-white/46 sm:text-[18px]">
              Importe tes analyses, garde tes rendez-vous et note ce que tu ressens. Baseline construit ton historique et te montre ce qui a changé au fil du temps.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 shadow-[0_10px_28px_rgba(255,255,255,.08)] transition hover:-translate-y-0.5 hover:bg-white/92"
              >
                Créer mon espace santé <ArrowRight className="size-4" />
              </Link>

              <a
                href="#how"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-6 text-sm font-medium text-white/68 transition hover:bg-white/[0.055] hover:text-white"
              >
                Voir comment ça marche
              </a>
            </div>

            <p className="mt-4 text-xs text-white/26">
              Suivi et organisation uniquement. Baseline ne remplace pas un professionnel de santé.
            </p>

            <div className="mt-10 grid max-w-[530px] grid-cols-3 gap-5 border-t border-white/[0.07] pt-6">
              {[
                [FileText, "Tes documents"],
                [Activity, "Tes tendances"],
                [CalendarDays, "Tes rappels"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof FileText;
                return (
                  <div key={String(label)} className="flex items-center gap-2 text-[11px] text-white/35">
                    <I className="size-3.5 text-white/45" />
                    {String(label)}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-10 -inset-y-12 bg-[radial-gradient(circle_at_55%_45%,rgba(83,104,255,.10),transparent_54%)] blur-3xl" />

            <div className="relative mx-auto max-w-[740px]">
              <div className="rounded-[34px] border border-white/[0.08] bg-[#111214] p-3 shadow-[0_46px_130px_rgba(0,0,0,.52)]">
                <div className="overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#151619]">
                  <div className="flex h-11 items-center justify-between border-b border-white/[0.055] px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-white/[0.12]" />
                      <span className="size-2 rounded-full bg-white/[0.12]" />
                      <span className="size-2 rounded-full bg-white/[0.12]" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/18">Aujourd’hui</p>
                    <div className="grid size-6 place-items-center rounded-full bg-white/[0.05] text-[9px] text-white/42">AB</div>
                  </div>

                  <div className="grid min-h-[520px] lg:grid-cols-[170px_1fr]">
                    <aside className="hidden border-r border-white/[0.05] bg-black/10 p-5 lg:block">
                      <p className="text-[19px] font-medium tracking-[-0.045em]">baseline*</p>
                      <div className="mt-9 space-y-2 text-[11px] text-white/24">
                        <div className="rounded-xl bg-white/[0.065] px-3 py-2.5 text-white/74">Accueil</div>
                        <div className="px-3 py-2.5">Ma santé</div>
                        <div className="px-3 py-2.5">Documents</div>
                        <div className="px-3 py-2.5">Analyses</div>
                        <div className="px-3 py-2.5">Timeline</div>
                      </div>
                    </aside>

                    <div className="p-5 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] text-white/22">Mardi 22 septembre</p>
                          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.045em]">Bonjour Alex</h3>
                          <p className="mt-1 text-xs text-white/30">Voici ce qui mérite ton attention.</p>
                        </div>
                      </div>

                      <div className="mt-7 grid gap-3">
                        {[
                          [Stethoscope, "Dentiste", "Dernière visite il y a 2 ans"],
                          [Activity, "Douleur au dos", "Signalée depuis 3 semaines"],
                          [Eye, "Ophtalmologue", "Contrôle à planifier"],
                        ].map(([Icon, title, copy]) => {
                          const I = Icon as typeof Stethoscope;
                          return (
                            <div key={String(title)} className="flex items-center gap-3 rounded-[18px] border border-white/[0.055] bg-white/[0.025] p-3.5">
                              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.045]">
                                <I className="size-4 text-white/52" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-white/88">{String(title)}</p>
                                <p className="mt-0.5 truncate text-[11px] text-white/25">{String(copy)}</p>
                              </div>
                              <ArrowRight className="size-3.5 text-white/18" />
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 rounded-[20px] border border-white/[0.055] bg-black/10 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Droplets className="size-4 text-white/38" />
                              <p className="text-[10px] uppercase tracking-[0.16em] text-white/22">Ferritine</p>
                            </div>
                            <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">490 <span className="text-[11px] font-normal text-white/25">µg/L</span></p>
                          </div>
                          <div className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[10px] text-white/25">
                            2022 → 2026
                          </div>
                        </div>

                        <div className="relative mt-5 h-[145px] overflow-hidden">
                          <div className="absolute inset-x-0 bottom-[28%] top-[24%] rounded-xl bg-emerald-300/[0.03]" />
                          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 145" preserveAspectRatio="none" aria-label="Évolution de la ferritine">
                            <path d="M0 116 C72 115 106 101 155 98 C218 94 246 82 300 70 C365 56 399 38 446 32 C480 28 505 16 520 12" fill="none" stroke="rgba(255,255,255,.84)" strokeWidth="2.5" strokeLinecap="round" />
                            {[
                              ["0","116"],
                              ["155","98"],
                              ["300","70"],
                              ["446","32"],
                              ["520","12"],
                            ].map(([cx, cy], index) => (
                              <circle key={index} cx={cx} cy={cy} r="4" fill="#151619" stroke="#fff" strokeWidth="2" />
                            ))}
                          </svg>
                          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] text-white/18">
                            {years.map((year) => <span key={year}>{year}</span>)}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[11px] text-white/24">
                          <span>5 années reliées</span>
                          <span className="text-white/45">Voir le détail →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 right-7 hidden w-[210px] rounded-[20px] border border-white/[0.08] bg-[#17181c]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,.38)] backdrop-blur-xl xl:block">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-white/[0.045]">
                    <HeartPulse className="size-4 text-white/48" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">Historique</p>
                    <p className="mt-1 text-sm font-medium text-white/78">5 années reliées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
