import "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { BIOMARKERS, normalizeText } from "@/lib/health/catalog";

export type ExtractedLabResult = {
  biomarkerSlug: string;
  rawName: string;
  valueNumeric: number;
  unitRaw: string | null;
  referenceLow: number | null;
  referenceHigh: number | null;
  flag: "low" | "normal" | "high" | "unknown";
};

const numberPattern = /(-?\d+(?:[\s.,]\d+)*)/g;
const unitPattern = /(mg\/l|g\/l|g\/dl|µg\/l|ug\/l|mmol\/l|µmol\/l|umol\/l|u\/l|ui\/l|mui\/l|t\/l|ml\/min\/1[.,]73\s*m[²2]|%)/i;

function toNumber(raw: string) {
  const normalized = raw.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function inferRange(line: string, value: number) {
  const ranges = [...line.matchAll(/(-?\d+(?:[.,]\d+)?)\s*(?:-|à|a)\s*(-?\d+(?:[.,]\d+)?)/gi)];
  for (const match of ranges) {
    const low = toNumber(match[1]);
    const high = toNumber(match[2]);
    if (low !== null && high !== null && low <= high && !(low === value && high === value)) {
      return { low, high };
    }
  }
  const maxMatch = line.match(/<\s*(-?\d+(?:[.,]\d+)?)/);
  if (maxMatch) return { low: null, high: toNumber(maxMatch[1]) };
  const minMatch = line.match(/>\s*(-?\d+(?:[.,]\d+)?)/);
  if (minMatch) return { low: toNumber(minMatch[1]), high: null };
  return { low: null, high: null };
}

function computeFlag(value: number, low: number | null, high: number | null): ExtractedLabResult["flag"] {
  if (low !== null && value < low) return "low";
  if (high !== null && value > high) return "high";
  if (low !== null || high !== null) return "normal";
  return "unknown";
}

function aliasIndexInLine(normalizedLine: string, alias: string) {
  const normalizedAlias = normalizeText(alias);
  if (normalizedAlias.length > 3) return normalizedLine.indexOf(normalizedAlias);
  const escaped = normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "i").exec(normalizedLine);
  return match ? match.index + match[1].length : -1;
}

export async function extractLabResultsFromPdf(buffer: Buffer): Promise<ExtractedLabResult[]> {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    const lines = result.text.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
    const extracted: ExtractedLabResult[] = [];

    for (const line of lines) {
      const normalizedLine = normalizeText(line);
      const definition = BIOMARKERS.find((item) => item.aliases.some((alias) => aliasIndexInLine(normalizedLine, alias) >= 0));
      if (!definition) continue;

      const numbers = [...line.matchAll(numberPattern)]
        .map((m) => ({ raw: m[1], value: toNumber(m[1]), index: m.index ?? 0 }))
        .filter((x): x is { raw: string; value: number; index: number } => x.value !== null);
      if (!numbers.length) continue;

      const aliasIndices = definition.aliases.map((alias) => aliasIndexInLine(normalizedLine, alias)).filter((index) => index >= 0);
      const aliasIndex = aliasIndices.length ? Math.min(...aliasIndices) : 0;
      const valueCandidate = numbers.find((n) => n.index >= aliasIndex) ?? numbers[0];
      const unit = line.match(unitPattern)?.[1] ?? null;
      const range = inferRange(line, valueCandidate.value);

      if (!extracted.some((r) => r.biomarkerSlug === definition.slug)) {
        extracted.push({
          biomarkerSlug: definition.slug,
          rawName: definition.name,
          valueNumeric: valueCandidate.value,
          unitRaw: unit,
          referenceLow: range.low,
          referenceHigh: range.high,
          flag: computeFlag(valueCandidate.value, range.low, range.high),
        });
      }
    }

    return extracted;
  } finally {
    await parser.destroy();
  }
}
