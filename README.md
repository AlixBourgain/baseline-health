# Baseline — health timeline MVP

A privacy-first MVP for importing blood-test PDFs, extracting common biomarkers, and comparing them across years.

## What is implemented

- Next.js App Router + React + TypeScript
- Local shadcn-style component source using Base UI primitives
- Tailwind CSS design tokens
- Supabase Auth with email/password and email confirmation flow
- Protected application routes
- Private PDF storage bucket with ownership-based RLS
- Server-side PDF text extraction; the extracted full text is not persisted
- Common French blood-test biomarker extraction
- Manual correction/addition when automatic extraction is wrong
- Biomarker history, trend chart, and year-over-year comparison
- Explicit, versioned health-data consent event recorded server-side at account creation
- Withdrawal of health-data consent with deletion of active health documents/results
- Structured account data export
- Account deletion, including stored PDFs
- Privacy, terms, legal notice and medical-information templates
- No third-party analytics and no external AI processor enabled by default

## Important compliance boundary

This repository is **not a legal certification** and cannot by itself make a production service GDPR/HDS compliant. Compliance depends on the actual controller, processing purposes, contracts, hosting scope, security operations, retention, incident response and user-facing information.

For French health data, conduct a documented HDS applicability assessment before production. If HDS applies, every infrastructure/application layer that handles the relevant health data must fall inside the validated hosting scope. Do not assume that moving only the database to HDS is sufficient while PDFs transit through an unassessed application server.

Official references used for the product baseline:
- CNIL health-data requirements: https://www.cnil.fr/fr/sante-exigences-generales
- CNIL DPIA/AIPD: https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd
- ANS HDS: https://esante.gouv.fr/labels-certifications/hebergement-des-donnees-de-sante
- GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr

## Stack

- Next.js 16.3.5
- React 19.3.0
- Tailwind CSS 4.3.3
- Base UI 1.8.0
- Supabase JS 2.116.0 + SSR 0.12.7
- Recharts 3.10.1
- pdf-parse 2.4.5
- Zod 4.6.5

Dependencies are pinned exactly in `package.json`. Generate and commit the lockfile in the development environment before any deployment.

## Local setup

1. Install dependencies with your package manager.
2. Create a development Supabase project or local Supabase environment.
3. Apply `supabase/migrations/20260920210000_initial.sql`.
4. Copy `.env.example` to `.env.local` and fill the values.
5. In Supabase Auth, enable e-mail confirmation and configure the redirect URL:
   `http://localhost:3000/auth/callback`
6. Run `npm run dev`.

For production, use a separate project/environment and complete `COMPLIANCE.md`, `SECURITY.md` and `DEPLOYMENT.md` first. See `PRODUCT_STATUS.md` for what was verified in this build and what still requires a real deployment environment.

## Data model

- `profiles`: minimal account profile
- `privacy_consents`: immutable grant/withdraw events
- `biomarker_catalog`: shared biomarker definitions
- `lab_reports`: one uploaded analysis document
- `lab_results`: structured values linked to one report and one biomarker
- `storage.health-documents`: private PDF bucket, path begins with the user UUID

Every personal table has Row Level Security enabled. User-facing client access is restricted to rows owned by `auth.uid()`.

## PDF extraction

The MVP extracts text server-side with `pdf-parse`, searches a controlled biomarker catalog, and stores only structured results. It does **not** store a second full-text copy of the PDF.

The parser is intentionally conservative. If it cannot safely match a unit to the biomarker canonical unit, the value remains visible but is excluded from automatic longitudinal comparison until manually corrected.

Before production, add:
- antivirus / malicious-document scanning,
- isolated document-processing worker,
- broader laboratory-format test corpus,
- OCR only for scanned PDFs,
- confidence scoring and review UI,
- regression tests with de-identified fixtures.

## Product limitations in this MVP

The assistant page is intentionally disabled. Sending health data to an LLM creates a new processor/data-flow decision and should only be enabled after vendor due diligence, DPA/transfer analysis, HDS scope review when applicable, and medical-product qualification review if the feature starts making medical-purpose claims.

## Troubleshooting: écran blanc après inscription

Si le compte Auth est créé mais que l'écran devient blanc juste après l'inscription, vérifiez que `.env.local` contient aussi la clé serveur Supabase :

```env
SUPABASE_SECRET_KEY=sb_secret_xxx
```

Cette clé est utilisée **uniquement côté serveur** pour enregistrer la preuve de consentement et les opérations de suppression. Ne la préfixez jamais par `NEXT_PUBLIC_` et ne l'exposez jamais dans le navigateur.

Après modification de `.env.local`, arrêtez le serveur (`Ctrl+C`) puis relancez `npm run dev`.
