# Product status — 20 September 2026

## Implemented in this repository

- Public landing and legal-information routes.
- Account creation, email/password sign-in, email verification callback, sign-out and password reset.
- Explicit, versioned health-data consent recorded server-side; user metadata is not trusted for authorization or consent proof.
- Protected authenticated application shell.
- Private blood-test PDF upload with 10 MB limit, per-user storage path and SHA-256 duplicate detection.
- Server-side text extraction for a controlled biomarker catalog; full extracted PDF text is not persisted.
- Manual correction/addition of extracted values.
- Historical blood-test list.
- Biomarker history chart and year-by-year comparison based on sample date, not import date.
- Conservative unit handling: values with incompatible/unrecognized units are not silently mixed into longitudinal comparisons.
- Private signed PDF download URLs with short expiry.
- RLS policies for every personal-data table and ownership checks on nested result/report relationships.
- Self-service structured export, health-consent withdrawal and full account deletion.
- Privacy, terms, legal-notice and medical-information templates.
- External AI assistant intentionally disabled until processor/HDS/medical-purpose review.

## Verification completed here

- TypeScript/TSX syntax transpilation: passed for all application source files.
- Local `@/` import resolution check: passed.
- JSON configuration validation: passed.
- Secret/client boundary grep: no secret key reference in client components.
- Current Supabase guidance reviewed for RLS, SSR auth and 2026 Data API grant changes; the migration uses explicit grants plus RLS.

## Verification still required in the real development environment

The execution environment used to assemble this repository could not reach the npm registry long enough to install dependencies, so a real semantic typecheck/build has not been executed here.

Before merge/deploy, run:

```bash
npm install
npm run typecheck
npm run build
```

Commit the generated lockfile. Then provision a non-production Supabase environment, apply the migration, run Supabase database/security advisors, and perform end-to-end tests for sign-up, consent, upload, RLS isolation, export, withdrawal and deletion.

## Hard production gates before real health data

Do not onboard real users until the HDS applicability/scope decision, AIPD/DPIA, processor contracts, retention policy, incident response, malware scanning/sandboxing, rate limiting, MFA/security hardening and penetration testing are complete.
