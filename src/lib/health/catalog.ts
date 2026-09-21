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
  { slug: "fer", name: "Fer", category: "Fer", canonicalUnit: "µmol/L", aliases: ["fer", "fer sérique", "fer serique", "iron"] },
  { slug: "transferrine", name: "Transferrine", category: "Fer", canonicalUnit: "g/L", aliases: ["transferrine", "transferrin"] },
  { slug: "capacite_totale_fixation", name: "Capacité totale de fixation", category: "Fer", canonicalUnit: "µmol/L", aliases: ["capacité totale de fixation", "capacite totale de fixation", "ctf", "tibc"] },
  { slug: "saturation_transferrine", name: "Saturation de la transferrine", category: "Fer", canonicalUnit: "%", aliases: ["coefficient de saturation", "cs-tf", "saturation transferrine", "transferrin saturation"] },

  { slug: "hematies", name: "Hématies", category: "Hématologie", canonicalUnit: "T/L", aliases: ["hématies", "hematies", "globules rouges", "rbc"] },
  { slug: "hemoglobine", name: "Hémoglobine", category: "Hématologie", canonicalUnit: "g/dL", aliases: ["hémoglobine", "hemoglobine", "hemoglobin", "hb"] },
  { slug: "hematocrite", name: "Hématocrite", category: "Hématologie", canonicalUnit: "%", aliases: ["hématocrite", "hematocrite", "hct"] },
  { slug: "vgm", name: "VGM", category: "Hématologie", canonicalUnit: "fL", aliases: ["v.g.m", "vgm", "mcv"] },
  { slug: "tcmh", name: "TCMH", category: "Hématologie", canonicalUnit: "pg", aliases: ["t.c.m.h", "tcmh", "mch"] },
  { slug: "ccmh", name: "CCMH", category: "Hématologie", canonicalUnit: "g/dL", aliases: ["c.c.m.h", "ccmh", "mchc"] },
  { slug: "leucocytes", name: "Leucocytes", category: "Hématologie", canonicalUnit: "G/L", aliases: ["leucocytes", "globules blancs", "wbc", "white blood cells"] },
  { slug: "neutrophiles", name: "Neutrophiles", category: "Hématologie", canonicalUnit: "G/L", aliases: ["polynucléaires neutrophiles", "polynucleaires neutrophiles", "neutrophiles", "neutrophils"] },
  { slug: "eosinophiles", name: "Éosinophiles", category: "Hématologie", canonicalUnit: "G/L", aliases: ["polynucléaires éosinophiles", "polynucleaires eosinophiles", "éosinophiles", "eosinophiles", "eosinophils"] },
  { slug: "basophiles", name: "Basophiles", category: "Hématologie", canonicalUnit: "G/L", aliases: ["polynucléaires basophiles", "polynucleaires basophiles", "basophiles", "basophils"] },
  { slug: "lymphocytes", name: "Lymphocytes", category: "Hématologie", canonicalUnit: "G/L", aliases: ["lymphocytes", "lymphocyte"] },
  { slug: "monocytes", name: "Monocytes", category: "Hématologie", canonicalUnit: "G/L", aliases: ["monocytes", "monocyte"] },
  { slug: "myelemie", name: "Myélémie", category: "Hématologie", canonicalUnit: "%", aliases: ["myélémie", "myelemie", "immatures gran", "granulocytes immatures"] },
  { slug: "erythroblastes", name: "Érythroblastes", category: "Hématologie", canonicalUnit: "%", aliases: ["erythroblastes", "érythroblastes", "nrbc"] },
  { slug: "plaquettes", name: "Plaquettes", category: "Hématologie", canonicalUnit: "G/L", aliases: ["plaquettes", "platelets", "plt"] },

  { slug: "hba1c", name: "HbA1c", category: "Métabolisme", canonicalUnit: "%", aliases: ["hba1c", "hémoglobine glyquée", "hemoglobine glyquee", "glycated hemoglobin"] },
  { slug: "glycemie", name: "Glycémie", category: "Métabolisme", canonicalUnit: "g/L", aliases: ["glycémie", "glycemie", "glucose", "glucose à jeun", "glucose a jeun"] },

  { slug: "sodium", name: "Sodium", category: "Électrolytes", canonicalUnit: "mmol/L", aliases: ["sodium", "na+"] },
  { slug: "potassium", name: "Potassium", category: "Électrolytes", canonicalUnit: "mmol/L", aliases: ["potassium sérique", "potassium serique", "potassium", "k+"] },
  { slug: "chlore", name: "Chlore", category: "Électrolytes", canonicalUnit: "mmol/L", aliases: ["chlore", "chlorure", "chloride"] },
  { slug: "calcium_corrige", name: "Calcium corrigé", category: "Électrolytes", canonicalUnit: "mmol/L", aliases: ["calcium corrigé", "calcium corrige", "corrected calcium"] },
  { slug: "calcium", name: "Calcium", category: "Électrolytes", canonicalUnit: "mmol/L", aliases: ["calcium", "calcémie", "calcemie"] },
  { slug: "phosphore", name: "Phosphore", category: "Électrolytes", canonicalUnit: "mmol/L", aliases: ["phosphore", "phosphate", "phosphorus"] },

  { slug: "creatinine", name: "Créatinine", category: "Reins", canonicalUnit: "µmol/L", aliases: ["créatinine", "creatinine", "creatinine sanguine"] },
  { slug: "egfr", name: "DFG estimé", category: "Reins", canonicalUnit: "mL/min/1.73m²", aliases: ["dfg", "d.f.g", "egfr", "débit de filtration glomérulaire", "debit de filtration glomerulaire"] },

  { slug: "alat", name: "ALAT", category: "Foie", canonicalUnit: "U/L", aliases: ["alat", "alt", "tgp"] },
  { slug: "asat", name: "ASAT", category: "Foie", canonicalUnit: "U/L", aliases: ["asat", "ast", "tgo"] },
  { slug: "ggt", name: "GGT", category: "Foie", canonicalUnit: "U/L", aliases: ["ggt", "gamma gt", "gamma-gt", "gamma glutamyl transférase", "gamma glutamyl transferase"] },
  { slug: "phosphatases_alcalines", name: "Phosphatases alcalines", category: "Foie", canonicalUnit: "U/L", aliases: ["phosphatases alcalines", "phosphatase alcaline", "alp"] },

  { slug: "albumine", name: "Albumine", category: "Protéines", canonicalUnit: "g/L", aliases: ["albumine", "albumin"] },
  { slug: "lipase", name: "Lipase", category: "Pancréas", canonicalUnit: "U/L", aliases: ["lipase"] },

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
