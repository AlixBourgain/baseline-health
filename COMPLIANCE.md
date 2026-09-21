# Compliance production checklist — France / EU

This is a product-engineering checklist, not legal advice or a certification.

## Before any real-user launch

- [ ] Identify the legal entity acting as controller and complete the legal notice.
- [ ] Document Article 6 legal basis for account/service processing.
- [ ] Confirm the Article 9 condition for health-data processing; this MVP records explicit consent but counsel should validate the final basis and wording.
- [ ] Complete a record of processing activities.
- [ ] Perform and sign off a DPIA/AIPD. CNIL states that most health-data processing will require one.
- [ ] Decide whether a DPO is mandatory or voluntarily appointed; publish the contact route.
- [ ] Finalize the privacy notice with purposes, categories, recipients, retention, transfers and rights.
- [ ] Inventory every processor/subprocessor and sign DPAs.
- [ ] Review any data transfer outside the EEA and put appropriate safeguards in place where needed.
- [ ] Conduct an HDS applicability analysis for the exact service and data flow.
- [ ] If HDS applies, select an ANS-listed certified hosting arrangement covering the required activities and ensure the application processing path is in scope.
- [ ] Establish a retention schedule for active data, backups, logs and deleted accounts.
- [ ] Establish data-breach detection, escalation and notification procedures.
- [ ] Establish a manual workflow for access, rectification, restriction, objection and portability requests not handled in-app.
- [ ] Validate the product's medical-purpose claims. If functionality moves toward diagnosis, prediction, prevention, monitoring or treatment for a medical purpose, perform medical-device software qualification/classification review before launch.
- [ ] Perform security review and penetration testing.

## Current privacy-by-design decisions in code

- Data minimization: only first name is requested for the profile in the MVP.
- No ad SDKs, product analytics or session replay.
- No health data sent to an external AI vendor.
- Original PDFs are private and protected by RLS storage policies.
- Extracted raw PDF text is not persisted.
- Automatic extraction is editable and clearly non-authoritative.
- Unit mismatches are excluded from automatic longitudinal comparison.
- Health-data consent is versioned and auditable as grant/withdraw events.
- Withdrawal deletes active health documents/results.
- Data export and account deletion are self-service.
- Protected pages are dynamically rendered and not cached as public content.

## Official references

CNIL health requirements:
https://www.cnil.fr/fr/sante-exigences-generales

CNIL health/mobile applications:
https://www.cnil.fr/fr/applications-mobiles-en-sante-et-protection-des-donnees-personnelles-les-questions-se-poser

CNIL DPIA:
https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd

ANS HDS:
https://esante.gouv.fr/labels-certifications/hebergement-des-donnees-de-sante

ANS HDS scope FAQ:
https://esante.gouv.fr/faq/quel-est-le-champ-dapplication-de-la-legislation-relative-lhebergement-de-donnees-de-sante-caractere-personnel

GDPR consolidated text:
https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr
