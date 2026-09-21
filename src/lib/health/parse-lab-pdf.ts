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

export type ExtractedLabReport = {
  sampleDate: string | null;
  labName: string | null;
  results: ExtractedLabResult[];
};

const numberPattern = /(-?\d+(?:[\s.,]\d+)*)/g;
const unitPattern = /(giga\/l|tera\/l|mg\/l|g\/l|g\/dl|µg\/l|ug\/l|mmol\/l|µmol\/l|umol\/l|u\/l|ui\/l|mui\/l|t\/l|fl|pg|ml\/(?:min|mn)\/1[.,]73\s*m[²2]|%)/i;
const absoluteDifferentialSlugs = new Set(["neutrophiles", "eosinophiles", "basophiles", "lymphocytes", "monocytes"]);

function toNumber(raw: string) {
  const normalized = raw.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeExtractedUnit(raw: string | null) {
  if (!raw) return null;
  const normalized = raw.toLowerCase().replace(/\s/g, "");
  if (normalized === "giga/l") return "G/L";
  if (normalized === "tera/l") return "T/L";
  if (normalized === "fl") return "fL";
  return raw;
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
  const escaped = normalizedAlias.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
  const match = new RegExp("(^|[^a-z0-9])" + escaped + "(?=$|[^a-z0-9])", "i").exec(normalizedLine);
  return match ? match.index + match[1].length : -1;
}

function extractSampleDate(text: string) {
  const patterns = [
    /pr[eé]lev[eé]\s+le\s+(\d{1,2})[./-](\d{1,2})[./-](\d{4})/i,
    /date\s+de\s+pr[eé]l[eè]vement\s*[:\-]?\s*(\d{1,2})[./-](\d{1,2})[./-](\d{4})/i,
    /pr[eé]l[eè]vement\s*[:\-]?\s*(\d{1,2})[./-](\d{1,2})[./-](\d{4})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const day = match[1];
    const month = match[2];
    const year = match[3];
    const iso = year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
    const date = new Date(iso + "T00:00:00Z");
    if (!Number.isNaN(date.getTime())) return iso;
  }
  return null;
}

function extractLabName(lines: string[]) {
  const candidates = lines.slice(0, 15);
  const preferred = candidates.find((line) => /laboratoire de biologie m[eé]dicale/i.test(line));
  if (preferred) return preferred.slice(0, 120);
  const branded = candidates.find((line) => /cerballiance|biogroup|unilabs|synlab/i.test(line));
  return branded ? branded.slice(0, 120) : null;
}

function extractEgfr(lines: string[]): ExtractedLabResult | null {
  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized.includes("debit de filtration calcule") && !normalized.includes("dfg calcule")) continue;

    const match = line.match(/(?:débit de filtration calculé|debit de filtration calcule|dfg calcul[eé])\s*:?\s*(\d+(?:[.,]\d+)?)\s*ml\/(?:mn|min)\/1[.,]73\s*m[²2]/i);
    if (!match) continue;

    const value = toNumber(match[1]);
    if (value === null) continue;

    const minMatch = line.match(/>\s*(\d+(?:[.,]\d+)?)/);
    const low = minMatch ? toNumber(minMatch[1]) : null;

    return {
      biomarkerSlug: "egfr",
      rawName: "DFG estimé",
      valueNumeric: value,
      unitRaw: "mL/min/1.73m²",
      referenceLow: low,
      referenceHigh: null,
      flag: computeFlag(value, low, null),
    };
  }
  return null;
}

function pickValueAndUnit(line: string, slug: string, aliasIndex: number, numbers: Array<{ raw: string; value: number; index: number }>) {
  if (absoluteDifferentialSlugs.has(slug)) {
    const absolute = line.match(/\d+(?:[.,]\d+)?\s*%\s*soit\s*:?\s*\*?\s*(\d+(?:[.,]\d+)?)\s*(giga\/l|g\/l)/i);
    if (absolute) {
      const value = toNumber(absolute[1]);
      if (value !== null) {
        const matchIndex = absolute.index ?? 0;
        const valueIndex = line.indexOf(absolute[1], matchIndex);
        return {
          valueCandidate: { raw: absolute[1], value, index: valueIndex >= 0 ? valueIndex : matchIndex },
          unit: normalizeExtractedUnit(absolute[2]),
        };
      }
    }
  }

  const valueCandidate = numbers.find((n) => n.index >= aliasIndex) ?? numbers[0];
  const unit = normalizeExtractedUnit(line.match(unitPattern)?.[1] ?? null);
  return { valueCandidate, unit };
}

export async function extractLabReportFromPdf(buffer: Buffer): Promise<ExtractedLabReport> {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    const lines = result.text.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
    const extracted: ExtractedLabResult[] = [];

    const egfr = extractEgfr(lines);
    if (egfr) extracted.push(egfr);

    for (const line of lines) {
      const normalizedLine = normalizeText(line);
      const definition = BIOMARKERS.find((item) => item.aliases.some((alias) => aliasIndexInLine(normalizedLine, alias) >= 0));
      if (!definition) continue;
      if (definition.slug === "egfr" && egfr) continue;

      const numbers = [...line.matchAll(numberPattern)]
        .map((m) => ({ raw: m[1], value: toNumber(m[1]), index: m.index ?? 0 }))
        .filter((x): x is { raw: string; value: number; index: number } => x.value !== null);
      if (!numbers.length) continue;

      const aliasIndices = definition.aliases.map((alias) => aliasIndexInLine(normalizedLine, alias)).filter((index) => index >= 0);
      const aliasIndex = aliasIndices.length ? Math.min(...aliasIndices) : 0;
      const { valueCandidate, unit } = pickValueAndUnit(line, definition.slug, aliasIndex, numbers);
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

    return {
      sampleDate: extractSampleDate(result.text),
      labName: extractLabName(lines),
      results: extracted,
    };
  } finally {
    await parser.destroy();
  }
}

export async function extractLabResultsFromPdf(buffer: Buffer): Promise<ExtractedLabResult[]> {
  return (await extractLabReportFromPdf(buffer)).results;
}
