# Production deployment notes

## Health-data hosting

The code is container-friendly, but the production target is intentionally not hard-coded.

For a French launch, first document whether the actual service falls within HDS scope. If it does, use a currently certified HDS arrangement from the ANS list and verify the certificate covers the activities you consume.

Important: the Next.js server receives uploaded PDFs before forwarding them to object storage. Therefore, when HDS applies, the application runtime itself must be assessed as part of the data path; putting only Postgres or object storage on HDS infrastructure is not enough by itself.

Do not assume a generic SaaS/serverless hosting plan is HDS-certified. Verify the current certificate, scope, region and contract at launch time.

## Recommended topology

Internet
→ WAF / TLS termination
→ Next.js application runtime
→ private Postgres/Auth service
→ private object storage
→ isolated document-processing worker

Keep all health-data processing services in the selected compliant environment when required.

## Environments

- Development: synthetic/de-identified data only.
- Staging: synthetic/de-identified data only unless staging is inside the validated production-grade compliance perimeter.
- Production: real health data, full security controls and documented processors.

## Backups

Define and contract:
- encryption,
- backup frequency,
- restore testing,
- geographic location,
- deletion propagation,
- retention period,
- access controls and auditability.
