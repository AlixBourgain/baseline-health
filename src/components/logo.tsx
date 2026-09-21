import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-8 place-items-center rounded-full bg-neutral-950 text-sm text-white">B</span>
      <span>Baseline</span>
    </Link>
  );
}
