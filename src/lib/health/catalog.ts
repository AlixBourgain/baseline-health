export type BiomarkerDefinition = {
  slug: string;
  name: string;
  category: string;
  canonicalUnit: string | null;
  aliases: string[];
};

export const BIOMARKERS: BiomarkerDefinition[] = [
  { slug: "crp", name: "CRP", category: "Inflammation", canonicalUnit: "mg/L", aliases: ["crp", "protéine c réactive", "proteine c reactive", "c reactive protein"] },
  { slug: "ferritine", name: "Ferritine", category: "Fer", canonicalUnit: "µg/L", aliases: ["ferritine", "ferritin"] },
  { slug: "leucocytes", name: "Leucocytes", category: "Hématologie", canonicalUnit: "G/L", aliases: ["leucocytes", "globules blancs", "wbc", "white blood cells"] },
  { slug: "plaquettes", name: "Plaquettes", category: "Hématologie", canonicalUnit: "G/L", aliases: ["plaquettes", "platelets", "plt"] },
  { slug: "hba1c", name: "HbA1c", category: "Métabolisme", canonicalUnit: "%", aliases: ["hba1c", "hémoglobine glyquée", "hemoglobine glyquee", "glycated hemoglobin"] },
  { slug: "hemoglobine", name: "Hémoglobine", category: "Hématologie", canonicalUnit: "g/dL", aliases: ["hémoglobine", "hemoglobine", "hemoglobin", "hb"] },
  { slug: "glycemie", name: "Glycémie", category: "Métabolisme", canonicalUnit: "g/L", aliases: ["glycémie", "glycemie", "glucose", "glucose à jeun", "glucose a jeun"] },
  { slug: "creatinine", name: "Créatinine", category: "Reins", canonicalUnit: "µmol/L", aliases: ["créatinine", "creatinine", "creatinine sanguine"] },
  { slug: "egfr", name: "DFG estimé", category: "Reins", canonicalUnit: "mL/min/1.73m²", aliases: ["dfg", "d.f.g", "egfr", "débit de filtration glomérulaire", "debit de filtration glomerulaire"] },
  { slug: "alat", name: "ALAT", category: "Foie", canonicalUnit: "U/L", aliases: ["alat", "alt", "tgp"] },
  { slug: "asat", name: "ASAT", category: "Foie", canonicalUnit: "U/L", aliases: ["asat", "ast", "tgo"] },
  { slug: "ggt", name: "GGT", category: "Foie", canonicalUnit: "U/L", aliases: ["ggt", "gamma gt", "gamma-gt", "gamma glutamyl transférase", "gamma glutamyl transferase"] },
  { slug: "ldl", name: "LDL cholestérol", category: "Lipides", canonicalUnit: "g/L", aliases: ["ldl", "ldl cholestérol", "ldl cholesterol"] },
  { slug: "hdl", name: "HDL cholestérol", category: "Lipides", canonicalUnit: "g/L", aliases: ["hdl", "hdl cholestérol", "hdl cholesterol"] },
  { slug: "triglycerides", name: "Triglycérides", category: "Lipides", canonicalUnit: "g/L", aliases: ["triglycérides", "triglycerides"] },
  { slug: "tsh", name: "TSH", category: "Thyroïde", canonicalUnit: "mUI/L", aliases: ["tsh", "thyroid stimulating hormone"] }
];

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
