# Security Policy

## Supported Versions

Vexa Mail Insight is in early development (`0.x`). Only the latest `main` branch and the most recent tagged release receive security updates.

| Version        | Supported          |
| -------------- | ------------------ |
| `main`         | :white_check_mark: |
| latest release | :white_check_mark: |
| older releases | :x:                |

## Reporting a Vulnerability

**Please do not open public GitHub issues for security vulnerabilities.**

Report vulnerabilities privately to:

- Email: **me@cristiandeluxe.dev**
- Subject prefix: `[security] vexa-mail-insight: <short description>`

You can also use GitHub's [private security advisories](https://github.com/VexaMail/vexa-insight-dashboard/security/advisories/new) for coordinated disclosure.

When reporting, please include:

- A clear description of the vulnerability and its impact.
- Steps to reproduce (proof-of-concept code, payloads, or affected URLs).
- The version / commit SHA affected.
- Your suggested mitigation, if you have one.

## Response SLA

- Initial acknowledgement: within **5 business days**.
- Triage and severity assessment: within **10 business days**.
- Coordinated disclosure timeline is agreed with the reporter once a fix is in progress.

## Sensitive Surface Areas

When evaluating reports, these are the components most likely to be impactful:

- **`/api/v1/admin/*`** endpoints — protected by `SECRET_KEY`. Should never be exposed publicly without additional network or application-level access control.
- **`/install`** route — first-time setup. Locked once the first user exists.
- **IMAP credentials** — stored encrypted at rest in the database; review credential handling in `services/imap/` and the Settings UI.
- **DMARC report ingestion** — XML parsing of untrusted email attachments (`.zip` and `.gz`); review parser surface in `services/ingestion/`.
- **Authentication and session handling** — review `services/auth/` and the `sessions` table.

## Scope

In scope:

- Source code in this repository.
- Default Docker image and `docker-compose.yml` configuration shipped here.

Out of scope:

- Self-hosted deployments where the operator has changed defaults in ways the documentation explicitly warns against.
- Third-party dependencies (please report to the upstream maintainer; we will pin/upgrade as needed).
- Social engineering, physical attacks, or denial of service via brute-force.

## Recognition

Reporters who follow responsible disclosure will be credited (with consent) in the relevant `CHANGELOG.md` entry and in the GitHub security advisory.
