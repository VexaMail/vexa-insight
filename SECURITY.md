# Security Policy

## Supported Versions

Vexa Mail Insight is in early development (`0.x`). Only the latest `main` branch
and the most recent tagged release receive security updates.

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

You can also use GitHub's
[private security advisories](https://github.com/VexaMail/vexa-insight-dashboard/security/advisories/new)
for coordinated disclosure.

When reporting, please include:

- A clear description of the vulnerability and its impact.
- Steps to reproduce (proof-of-concept code, payloads, or affected URLs).
- The version / commit SHA affected.
- Your suggested mitigation, if you have one.

## Response SLA

- Initial acknowledgement: within **5 business days**.
- Triage and severity assessment: within **10 business days**.
- Coordinated disclosure timeline is agreed with the reporter once a fix is in
  progress.

## Sensitive Surface Areas

When evaluating reports, these are the components most likely to be impactful:

- **`/api/v1/admin/*`** endpoints — protected by `SECRET_KEY` (timing-safe HMAC
  comparison) and/or a valid admin session cookie. The admin API refuses to
  authenticate when `SECRET_KEY` is unset, equal to `CHANGE_ME`, or shorter than
  32 characters. Should never be exposed publicly without additional network or
  application-level access control.
- **`/install`** route — first-time setup. Locked once the first user exists. On
  first boot the server prints a one-time install token to stdout (re-displayed
  every boot until installation completes). `POST /api/install` requires the
  token via the `x-install-token` header or the `installToken` body field and
  refuses non-loopback requests by default; the token is wiped from memory after
  a successful install. Set `VEXA_ALLOW_REMOTE_INSTALL=1` to relax the loopback
  restriction — the token remains mandatory.
- **Login** — rate-limited to 5 attempts per minute per IP, scrypt +
  `crypto.timingSafeEqual` for password verification.
- **IMAP credentials** — stored encrypted at rest in the database using
  AES-256-GCM. The encryption key is derived from `SECRET_KEY` via HKDF-SHA256
  (salt `vexa-imap-pwd-v1`, info `aes-gcm`); each ciphertext carries its own
  random 12-byte IV and is authenticated with the GCM tag. Blobs are stored with
  a `v1:` version prefix. Legacy plaintext rows from upgrades are migrated
  automatically on first boot after the upgrade. Review credential handling in
  `services/crypto/`, `services/settings/`, `services/imap/`, and the Settings
  UI.
- **DMARC report ingestion** — XML parsing of untrusted email attachments
  (`.zip` and `.gz`); review parser surface in `services/dmarc/` and
  `utils/dmarc/`. Uncompressed-size cap protects against zip bombs.
- **Self-update flow** — `scripts/self-update.sh` accepts only tag refs matching
  `^v\d+\.\d+\.\d+(-[A-Za-z0-9.-]+)?$`. Every invocation is recorded in
  `data/self-update.audit.log`. Build failures trigger automatic git/`.next`
  rollback before any supervisor signal.
- **Outbound webhooks** — payloads are signed with HMAC-SHA256 when an endpoint
  has a `secret`; verify on the receiver via the `X-Vexa-Signature` header.
- **Authentication and session handling** — review `services/auth/` (scrypt,
  30-day cookies, `HttpOnly`, `Secure` in production, `SameSite=lax`) and the
  `sessions` table.

## Scope

In scope:

- Source code in this repository.
- Default Docker image and `docker-compose.yml` configuration shipped here.

Out of scope:

- Self-hosted deployments where the operator has changed defaults in ways the
  documentation explicitly warns against.
- Third-party dependencies (please report to the upstream maintainer; we will
  pin/upgrade as needed).
- Social engineering, physical attacks, or denial of service via brute-force.

## Recognition

Reporters who follow responsible disclosure will be credited (with consent) in
the relevant `CHANGELOG.md` entry and in the GitHub security advisory.
