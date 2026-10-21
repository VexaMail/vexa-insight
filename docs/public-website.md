# Public domain checker

The public website provides a free DMARC and SPF checker, with common or
explicitly selected DKIM-key discovery and MX lookup. It uses the application’s
components and SPF/DMARC interpretation services. Its checker reads public DNS
records without loading customer reports, mailbox credentials or the application
database. The call to action links to the self-hosted installation instructions
on GitHub; there is no public account-registration flow.

## Run locally

```sh
PUBLIC_SITE_ONLY=true pnpm exec next dev --hostname 127.0.0.1 --port 3137
```

Open `http://127.0.0.1:3137/`. In this mode the root serves the landing, the
installer and private API routes return 404, and startup skips database
migrations and background jobs. Set `PUBLIC_SITE_ONLY=true` when starting the
process, including after a restart.

For a fresh production build and local preview:

```sh
PUBLIC_SITE_ONLY=true pnpm build
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
PUBLIC_SITE_ONLY=true HOSTNAME=127.0.0.1 PORT=3137 node .next/standalone/server.js
```

An existing private instance also exposes a preview at `/website`. Requests
whose hostname matches `PUBLIC_SITE_HOST` (default `insight.vexamail.com`)
receive the public routing boundary. A separate process running with
`PUBLIC_SITE_ONLY=true` provides the database-free deployment mode regardless of
its incoming hostname.

## Checker behavior

`GET /api/public/domain-check?domain=example.com` returns a timestamped report
for SPF, DKIM, DMARC and MX. URLs, email addresses, IP literals and private DNS
suffixes are rejected before resolution. International domain names are
converted to ASCII.

A completed check uses a shareable `/<domain>` URL, for example
`https://insight.vexamail.com/teleporte.es`. Opening that URL runs a fresh
check; it is not an immutable historical snapshot. Browser Back and Forward
restore the corresponding report or landing. Domain reports are `noindex`.

The visible score is a Vexa DNS configuration rubric, not a deliverability
measurement. SPF earns 50 points when one record passes basic validation and
bounded include/redirect dependency checks. SoftFail (`~all`) is valid. The
expanded lookup count is a static upper bound: the actual path, A/MX/exists/ptr
address answers and their void lookups depend on message evidence. Cycles,
missing or duplicate dependency policies and trees that can exceed ten lookup
terms need attention. Timeouts, sender-specific macros and exhausted budgets
leave SPF unverified. Each SPF scan has a six-second dependency deadline and at
most 24 dependency queries.

DMARC discovery checks the supplied name, then uses the RFC 9989 DNS tree walk
with at most eight names. Reports identify the inherited policy source and apply
`sp` when present. `psd=n` and `psd=y` establish policy boundaries. Records
containing `np` are left unscored when domain-existence evidence is unavailable.
Legacy PSL-based receivers may select a different policy. A valid policy earns
30 points, plus up to 10 for quarantine or 20 for reject. `t=y` reduces the
policy by one level. The rubric conservatively scales its bonus by legacy `pct`;
RFC 9989 receivers may ignore that obsolete tag. Monitoring is policy
information, not a configuration error.

The public resolver uses `1.1.1.1` and `8.8.8.8`, with a two-second timeout and
one try per server. The request cancels outstanding DNS work after twelve
seconds. It never fetches websites or connects to mail servers; non-public SPF
dependency names are rejected before lookup. NXDOMAIN and NODATA are absence;
temporary DNS failures remain unknown. Unknown SPF, DMARC or MX results are not
cached. Successful snapshots are cached for five minutes with at most 200
entries; coalescing and cache keys include the optional DKIM selector.

`GET /api/public/domain-check?domain=teleporte.es&selector=default` checks one
validated selector instead of the common-selector list. The report URL and
copied link retain `?selector=default`, including after reload or browser
navigation. DKIM and MX do not affect the score. Published keys cannot verify
message signing, and a missing MX does not prove an outbound-mail error.

Each process allows ten checks per caller per minute, sixty requests in total
per minute and four concurrent domain checks. Rate-limited responses return 429
with `Retry-After`; saturated processes return 503. These are process-local
safeguards. Keep a single checker process initially and configure trusted proxy
hops for the actual ingress chain. Scale-out needs a shared or edge-enforced
budget.

## Search and interface

The indexable homepage targets DMARC checker, check DMARC, SPF checker and email
authentication checker. It contains server-rendered protocol explanations,
visible questions, public Open Graph/Twitter metadata and WebApplication
structured data. The public sitemap contains the homepage only; domain snapshots
remain noindex. Reserved filenames such as sitemap.xml must not enter
domain-check routing.

Reports show the domain, score, prioritized next step and evidence before the
collapsed change-domain form. Copy report link uses the canonical public origin,
with a selectable fallback when clipboard access fails. A failed retry preserves
the last valid result. The product preview uses synthetic demonstration data,
not customer records.

See [checker research and roadmap](checker-competitive-review.md) for the
primary-source comparison and future modules. Blocklist monitoring and
real-message tests are not implemented by this public process.

## Live deployment

`https://insight.vexamail.com/` runs as a separate Enhance persistent app under
the Vexa Mail website on nova. Its working directory is
`services/vexa-insight-public`, its command is `sh start.sh`, its Node version
is `24.21.0`, and its port is `3003`. The startup script is maintained in
`deploy/public/start.sh`. It sets the public-only runtime and assumes two
trusted proxy hops for Cloudflare and Apache.

The hostname has a proxied Cloudflare A record and an origin certificate issued
by Enhance’s Let’s Encrypt integration. HTTP redirects to HTTPS. The application
directory contains no `.env` files or database directory. The installed
`REVISION` file records the full source SHA of the app runtime.

Verify the deployed site with:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 scripts/check-public-website.py https://insight.vexamail.com
```

The verifier uses `curl` for HTTP requests. Cloudflare’s browser integrity
checks return error 1010 to the default Python HTTP client; the curl transport
completes the checks without weakening the zone’s security settings.

## Production rollout

Deploy a separate public process under the Vexa Mail website in the hosting
panel. Reuse the existing standalone build packaging, including `.next/static`
and `public`. Start its `server.js` with `PUBLIC_SITE_ONLY=true` and an unused
port, then route `insight.vexamail.com` to that process through the website’s
HTTPS virtual host. Use the site’s own process manager and certificate
lifecycle.

The public process needs no database mount, mailbox configuration, encryption
key or access to the private instance. Exclude `.env` files and the `data`
directory from the public runtime package. Permit outbound DNS to the two
configured resolvers. Preserve existing mail DNS records when adding the new web
hostname. DNS, hosting and TLS changes require a separate rollout authorization.

Verify the HTTPS hostname after rollout: the landing and logo assets must return
200, a domain check must return four protocol results, and `/install`,
`/settings`, `/api/install` and `/api/v1/domains` must return 404. Inspect the
rendered form on desktop and mobile and check that submitting an invalid domain
leaves a readable error and an enabled retry button.

## Verification

```sh
pnpm exec vitest run --config vitest.config.mts test/publicDomainCheck.test.ts test/publicSiteRouting.test.ts test/publicCheckRoute.test.ts test/publicScoreRegression.test.ts test/publicDomainNavigation.test.tsx
pnpm run type-check
pnpm run knip
pnpm run deps:graph
```

The tests cover domain validation, DNS failure semantics, duplicate policies,
null MX, public routing, startup isolation, rate limits, shared lookups, cache
behavior and concurrency limits. Production build and browser checks also verify
the proxy rewrite and client hydration.

## Screenshot provenance

The public site starts in light mode unless the visitor has explicitly saved a
different theme. The header offers light and dark controls, and the choice
persists across visits. The public dashboard preview and README overview use a
light-mode capture; the other workspace screenshots retain their original theme.

The README screenshots and public dashboard preview were captured from the
application using an isolated database seeded with the built-in synthetic
demonstration dataset. They show example domains and documentation IP ranges,
not customer reports. Recapture the overview, domains, sending sources and
diagnostics when those workspaces change; keep the public preview and README
image in sync.

## Analytics and search measurement

The owned public deployment enables Google Analytics with
`PUBLIC_ANALYTICS_ID=G-RDQN39NVX8` in `deploy/public/start.sh`. Private
instances and the `/website` preview do not enable it unless explicitly
configured. Collection starts only after accepting the optional analytics panel.
Rejecting keeps the Google tag unloaded; preferences remain available in the
footer. Withdrawal stops custom events and removes this host's analytics
cookies.

The property records `page_view`, `checker_started`, `checker_completed`,
`checker_failed` and `installation_click`. The installation click is a key
event, not evidence that installation completed. Page locations are replaced
with the public origin; events exclude scanned domains, selectors and DNS
answers. Enhanced automatic measurement, Google signals and ad personalization
are disabled. The installation CTA leads only to the free self-hosted
instructions.

On 2026-10-21, the authorized Google account's domain property and dedicated
`https://insight.vexamail.com/` URL-prefix property accepted the sitemap. The
live URL Inspection test confirmed that Google could access and index the
homepage, and its priority indexing request was accepted. The index still did
not contain the homepage. The sitemap report retained a general HTTP error from
its first fetch, so successful sitemap processing remains unverified despite
normal XML responses and a successful live homepage test. Recheck it after the
rollout and Google's next retrieval; submission is not proof of indexing.

## Automated public rollout

Keep the deployment configuration and zone-scoped Cache Purge token outside the
repository. Both files must be owner-only. The configuration describes the SSH
host, port, identity file, service root, website and app identifiers, remote
restart-token location, production URL, Cloudflare zone and purge-token path.
The token grants only Cache Purge on the owned zone; its value is never logged.

After producing a verified Linux standalone artifact with its full source SHA in
`REVISION`, run:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 scripts/deploy-public-website.py /path/to/standalone --config "$HOME/.config/vexa-insight/public-deploy.json"
```

Replace the runtime path with the built artifact. The command stages a fresh
runtime, rejects environment/database files, preserves the previous app and
startup script, installs the public startup configuration and restarts the
process through Enhance. Enhance's PATCH also restarts sibling persistent apps.
It then purges only the homepage, robots, sitemap and light dashboard-preview
URLs, and runs the public boundary/DNS smoke check. A purge failure fails the
command; it is never reported as a successful invalidation.

For a standalone invalidation and verification:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 scripts/purge-public-cache.py
PYTHONDONTWRITEBYTECODE=1 python3 scripts/check-public-website.py https://insight.vexamail.com teleporte.es
```

The prior runtime remains available for recovery. No history, database or
customer data is removed by this workflow.
