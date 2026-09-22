import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Droplets,
  Eye,
  Stethoscope,
} from "lucide-react";

const years = ["2022", "2023", "2024", "2025", "2026"];

export function DesignCodeHero() {
  return (
    <section className="relative overflow-hidden bg-[#080809] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.06),transparent_26%),radial-gradient(circle_at_78%_38%,rgba(91,114,255,.10),transparent_24%)]" />

      <header className="relative z-30">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-[22px] font-medium tracking-[-0.045em] text-white">
            baseline<span className="align-top text-[14px]">*</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] text-white/42 md:flex">
            <a href="#vision" className="transition hover:text-white">Vision</a>
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
              Commencer <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-[950px] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/28">
            Votre santé, dans le temps
          </p>

          <h1
            className="mx-auto mt-6 text-[clamp(3.7rem,6.4vw,6.8rem)] font-semibold leading-[0.91] tracking-[-0.072em]"
            style={{ textWrap: "balance" }}
          >
            Toute ta santé.
            <span className="block text-white/34">Enfin lisible.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-[680px] text-[17px] leading-8 text-white/43 sm:text-[18px]">
            Baseline rassemble analyses, rendez-vous, symptômes et documents pour montrer ce qui change, ce qui revient et ce qui mérite ton attention.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5 hover:bg-white/92"
            >
              Découvrir Baseline <ArrowRight className="size-4" />
            </Link>

            <a
              href="#biomarkers"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-6 text-sm font-medium text-white/68 transition hover:bg-white/[0.055] hover:text-white"
            >
              Voir l’évolution
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1120px]">
          <div className="absolute -inset-x-12 -inset-y-12 bg-[radial-gradient(circle_at_50%_50%,rgba(81,104,255,.11),transparent_54%)] blur-3xl" />

          <div className="relative overflow-hidden rounded-[34px] border border-white/[0.075] bg-[#111214] shadow-[0_46px_130px_rgba(0,0,0,.52)]">
            <div className="flex h-12 items-center justify-between border-b border-white/[0.055] px-5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-white/[0.12]" />
                <span className="size-2 rounded-full bg-white/[0.12]" />
                <span className="size-2 rounded-full bg-white/[0.12]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/18">Baseline</p>
              <div className="size-5 rounded-full bg-white/[0.05]" />
            </div>

            <div className="grid min-h-[560px] lg:grid-cols-[185px_1fr]">
              <aside className="hidden border-r border-white/[0.05] bg-black/10 p-5 lg:block">
                <p className="text-[20px] font-medium tracking-[-0.045em]">baseline*</p>
                <div className="mt-9 space-y-2 text-[11px] text-white/25">
                  <div className="rounded-xl bg-white/[0.065] px-3 py-2.5 text-white/74">Accueil</div>
                  <div className="px-3 py-2.5">Ma santé</div>
                  <div className="px-3 py-2.5">Documents</div>
                  <div className="px-3 py-2.5">Analyses</div>
                  <div className="px-3 py-2.5">Timeline</div>
                </div>
              </aside>

              <div className="p-5 sm:p-8 lg:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[11px] text-white/22">Mardi 22 septembre</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.045em]">Bonjour Alex</h3>
                    <p className="mt-1 text-xs text-white/30">Voici ce qui mérite ton attention.</p>
                  </div>
                  <div className="grid size-9 place-items-center rounded-full bg-white/[0.055] text-[11px] text-white/55">AB</div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    [Stethoscope, "Dentiste", "2 ans", "Dernier contrôle"],
                    [Activity, "Douleur au dos", "3 sem.", "Depuis le signalement"],
                    [Eye, "Ophtalmo", "À prévoir", "Contrôle de suivi"],
                  ].map(([Icon, title, value, copy]) => {
                    const I = Icon as typeof Stethoscope;
                    return (
                      <div key={String(title)} className="rounded-[18px] border border-white/[0.055] bg-white/[0.022] p-4">
                        <div className="flex items-center justify-between">
                          <I className="size-4 text-white/40" />
                          <span className="text-[10px] uppercase tracking-[0.12em] text-white/18">{String(title)}</span>
                        </div>
                        <p className="mt-7 text-xl font-semibold tracking-[-0.04em] text-white/88">{String(value)}</p>
                        <p className="mt-1 text-[11px] text-white/24">{String(copy)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-[22px] border border-white/[0.055] bg-black/10 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Droplets className="size-4 text-white/38" />
                        <p className="text-[10px] uppercase tracking-[0.16em] text-white/22">Ferritine</p>
                      </div>
                      <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">490 <span className="text-[11px] font-normal text-white/25">µg/L</span></p>
                    </div>
                    <div className="rounded-full border border-white/[0.07] px-3 py-1.5 text-[10px] text-white/25">
                      Référence 30–300
                    </div>
                  </div>

                  <div className="relative mt-6 h-[210px] overflow-hidden">
                    <div className="absolute inset-x-0 bottom-[29%] top-[23%] rounded-[12px] bg-emerald-300/[0.035]" />
                    <div className="absolute inset-x-0 bottom-[29%] border-t border-dashed border-emerald-200/[0.08]" />
                    <div className="absolute inset-x-0 top-[23%] border-t border-dashed border-emerald-200/[0.08]" />

                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 210" preserveAspectRatio="none" aria-label="Évolution de la ferritine">
                      <path
                        d="M0 164 C90 162 132 146 205 142 C285 137 335 121 410 103 C505 80 562 58 625 52 C682 46 727 29 760 20"
                        fill="none"
                        stroke="rgba(255,255,255,.86)"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />
                      {[
                        ["0","164"],
                        ["205","142"],
                        ["410","103"],
                        ["625","52"],
                        ["760","20"],
                      ].map(([cx, cy], index) => (
                        <circle key={index} cx={cx} cy={cy} r="4.5" fill="#111214" stroke="#fff" strokeWidth="2" />
                      ))}
                    </svg>

                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-white/18">
                      {years.map((year) => <span key={year}>{year}</span>)}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-4 text-[11px] text-white/24">
                    <span>5 années d’historique reliées</span>
                    <span className="text-white/45">Voir le détail →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-10 left-[12%] right-[12%] h-16 rounded-full bg-black/70 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
