# Security baseline

## Implemented

- Server-validated Supabase sessions.
- RLS on every personal-data table.
- Ownership predicate uses `auth.uid()` and never user-editable JWT metadata.
- Private storage bucket with user UUID as first path segment.
- No service/secret key exposed to browser code.
- Secret-key operations are server-only and limited to account deletion/consent withdrawal.
- 10 MB upload limit and PDF MIME restriction.
- SHA-256 duplicate detection per account.
- Security headers: clickjacking protection, MIME sniffing protection, referrer restriction, browser capability restriction.
- Same-origin validation on destructive POST endpoints.
- No health payloads intentionally written to application logs.
- Original PDF signed URLs expire after 60 seconds.

## Required before production

- Malware scanning and sandboxed PDF processing.
- Rate limiting for login, sign-up, password reset, upload and destructive endpoints.
- MFA/TOTP for users, ideally strongly encouraged or required for accounts storing health data.
- Centralized security logging with strict redaction; no biomarker values, filenames or document contents in logs.
- Secret rotation and documented incident-response runbook.
- Backup/restore testing and deletion propagation policy.
- CSP tuned to the final production domains.
- Dependency lockfile, automated vulnerability scanning and signed CI/CD builds.
- Penetration test focused on BOLA/IDOR, storage paths, auth/session fixation, SSRF and malicious PDFs.
- Separate dev/staging/prod projects and secrets.

## Supabase production notes

Do not expose the secret/service key in `NEXT_PUBLIC_*` variables.
Do not authorize using `user_metadata`.
Do not remove RLS because server calls fail; fix policies instead.
Do not make the `health-documents` bucket public.
