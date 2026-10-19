# UI brief: Vexa Insight

## What the app is for

Vexa Insight is a self-hosted DMARC report analyzer. It pulls the aggregate
(RUA), failure (RUF) and SMTP TLS (TLS-RPT) reports that Google, Microsoft,
Yahoo and other receivers send about a set of domains, and answers: who is
sending mail as each domain, whether their SPF and DKIM results align with
DMARC, which senders are unknown or forwarded, whether the domain's DNS records
(SPF, DKIM, DMARC, MTA-STS, BIMI) are correct, and whether it is safe to move a
domain from `p=none` to `p=quarantine` or `p=reject`. It also has to show that
it is itself healthy: IMAP ingestion runs, job runs, parse failures.

## Who uses it

- **Operator of a hosting estate (primary, guess based on the one production
  instance)**: a sysadmin/devops who runs mail for dozens of client domains (the
  production instance holds about 74 domains and thousands of reports). Opens it
  daily or after an alert, on a desktop, expert in SPF/DKIM/DMARC. The job is
  triage: find what broke or changed since the last look (a new failing source,
  a domain whose DKIM stopped signing, a DNS record that went bad, ingestion
  that stalled), drill from symptom to cause (domain, source IP, report, DNS
  record) and fix it outside the app (DNS, mail server). Wants every fact one or
  two clicks away and no dead ends.
- **Security / deliverability engineer** (README audience): spots spoofing and
  misconfigured ESPs, trends pass rates, decides when to tighten policy.
- **Phone use**: occasional check of an alert; must be readable, not primary.

## Screens

- `/dashboard`: global KPIs (domains, reports, emails, compliance), global pass
  rate, ingestion health, pass/fail and SPF/DKIM charts, pass/fail trend.
- `/domains`: every monitored domain with compliance and status.
- `/domains/<domain>`: per-domain totals, pass vs fail, enforcement readiness
  (legitimate / forwarded / unknown senders and what enforcement would lose),
  sources table (IP, hostname, sender, count, CSV), TLS reports, failure
  reports, associated reports.
- `/diagnostics`, `/diagnostics/<domain>`: security score and live DNS checks of
  SPF, DKIM, DMARC, MTA-STS, BIMI with explanations; optional AI analysis.
- `/reports`, `/reports/<id>`: received aggregate reports, filter by
  organization and domain; detail shows the records of one report.
- `/ips`, `/ips/<ip>`: sending sources with hostname, geo, pass rates; detail
  shows related domains, related reports and an event timeline with SPF/DKIM
  results.
- `/ingest`, `/upload`: ingestion state, processed messages, job runs, manual
  upload.
- `/settings`, `/users`: IMAP accounts, intervals, API key, webhooks, AI
  provider, users.

## Constraints

- Next.js 16 App Router, React, Tailwind CSS v4, shadcn/Radix components,
  Recharts. Light and dark themes both required.
- Brand: Vexa green shield logo, green accent, Inter-like sans and a monospace
  for IPs and report ids.
- Everything is self-hosted and single-tenant; no feature may depend on a Vexa
  cloud service.
- RUF ingestion keeps identifiers only (no subject or body), so no screen may
  show message content.
