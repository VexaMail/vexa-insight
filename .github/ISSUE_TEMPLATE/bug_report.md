---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''
---

> **Before you paste anything: this tracker is public, and the data this app
> handles is not.** Redact or replace every real value. Use `example.com` for
> domains, `192.0.2.0/24` or `2001:db8::/32` for addresses, and
> `reporter@example.com` for mail addresses. Never attach a raw DMARC report, a
> database file, a log containing `SECRET_KEY` or an IMAP password, or an
> unedited screenshot of your own dashboard. If a bug only reproduces with real
> data, say so and we will take it privately — see
> [SECURITY.md](../../SECURITY.md).

**Describe the bug** A clear and concise description of what the bug is.

**To Reproduce** Steps to reproduce the behavior, against synthetic data where
possible (`pnpm run seed:demo`, or
`docker exec -e VEXA_FORCE_SEED_DEMO=1 vexa node dist/seed-demo.cjs`):

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior** A clear and concise description of what you expected to
happen.

**Screenshots** If applicable, and only with the domains, IP addresses and mail
addresses blurred or replaced.

**Environment:**

- Vexa version: [e.g. 0.2.3, or the image digest]
- Install method: [Docker, Compose, Helm, source]
- OS: [e.g. Ubuntu 22.04, macOS 14]
- Node.js version (source installs): [e.g. 22.0.0]
- Browser (if applicable): [e.g. chrome, safari]

**Additional context** Add any other context about the problem here.
