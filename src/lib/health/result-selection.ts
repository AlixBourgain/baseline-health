function extractionVersionRank(version: string | null | undefined) {
  const match = version?.match(/v(\d+)$/i);
  return match ? Number(match[1]) : 0;
}

function time(value: string | null | undefined) {
  if (!value) return 0;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function comparePreferredResult(a: any, b: any) {
  const sampleDateDiff = time(b.lab_reports?.sample_date) - time(a.lab_reports?.sample_date);
  if (sampleDateDiff) return sampleDateDiff;

  const extractionDiff =
    extractionVersionRank(b.lab_reports?.extraction_version) -
    extractionVersionRank(a.lab_reports?.extraction_version);
  if (extractionDiff) return extractionDiff;

  const canonicalDiff = Number(Boolean(b.unit_canonical)) - Number(Boolean(a.unit_canonical));
  if (canonicalDiff) return canonicalDiff;

  const reportCreatedDiff =
    time(b.lab_reports?.created_at) - time(a.lab_reports?.created_at);
  if (reportCreatedDiff) return reportCreatedDiff;

  return time(b.created_at) - time(a.created_at);
}

export function latestResultsByBiomarker(rows: any[], limit?: number) {
  const ordered = rows.slice().sort(comparePreferredResult);
  const seen = new Set<string>();
  const selected: any[] = [];

  for (const row of ordered) {
    const slug = row.biomarker_catalog?.slug;
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    selected.push(row);
    if (limit && selected.length >= limit) break;
  }

  return selected;
}

export function dedupeBiomarkerHistory(rows: any[]) {
  const preferred = new Map<string, any>();

  for (const row of rows) {
    const key = [
      row.lab_reports?.sample_date ?? "",
      row.lab_reports?.lab_name ?? "",
    ].join("|");

    const existing = preferred.get(key);
    if (!existing || comparePreferredResult(row, existing) < 0) {
      preferred.set(key, row);
    }
  }

  return [...preferred.values()].sort(
    (a, b) => time(a.lab_reports?.sample_date) - time(b.lab_reports?.sample_date),
  );
}

export function dedupeReports(rows: any[]) {
  const ordered = rows.slice().sort((a, b) => {
    const sampleDateDiff = time(b.sample_date) - time(a.sample_date);
    if (sampleDateDiff) return sampleDateDiff;

    const extractionDiff =
      extractionVersionRank(b.extraction_version) -
      extractionVersionRank(a.extraction_version);
    if (extractionDiff) return extractionDiff;

    return time(b.created_at) - time(a.created_at);
  });

  const seen = new Set<string>();
  const selected: any[] = [];

  for (const report of ordered) {
    const key = [report.sample_date ?? "", report.lab_name ?? ""].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(report);
  }

  return selected;
}
