export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(value: string | Date | null | undefined, locale = "fr-FR") {
  if (!value) return "Date à confirmer";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "Date à confirmer";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export function formatReferenceRange(
  low: number | string | null | undefined,
  high: number | string | null | undefined,
) {
  const hasLow = low !== null && low !== undefined && low !== "";
  const hasHigh = high !== null && high !== undefined && high !== "";

  if (hasLow && hasHigh) return `${low}–${high}`;
  if (hasHigh) return `< ${high}`;
  if (hasLow) return `> ${low}`;
  return null;
}

export function sanitizeFilename(filename: string) {
  return filename
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120) || "document.pdf";
}
