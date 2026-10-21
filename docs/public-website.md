# Public domain checker

The public website uses the application’s components and SPF/DMARC
interpretation services. Its checker reads public DNS records without loading
customer reports, mailbox credentials or the application database. The call to
action links to the self-hosted installation instructions on GitHub; there is no
public account-registration flow.

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

The resolver uses public DNS servers at `1.1.1.1` and `8.8.8.8`, with a
two-second timeout and one try per server. The checker makes DNS requests only:
it does not fetch arbitrary websites, MTA-STS policies or addresses from
user-supplied records. SPF includes are not expanded. DKIM discovery uses the
application’s fixed selector list and always explains that DNS cannot verify
message signing. DMARC checks the supplied name directly; organizational-domain
inheritance is not evaluated.

A timeout or resolver failure produces an unknown result rather than a
missing-record claim. NXDOMAIN and NODATA are treated as absent records. Unknown
SPF, DMARC or MX results are not cached. Successful snapshots are cached in
memory for five minutes, with at most 200 entries; requests for the same domain
share an in-flight lookup.

Each process allows ten checks per caller per minute, sixty requests in total
per minute and four concurrent domain checks. Rate-limited responses return 429
with `Retry-After`; saturated processes return 503. These are process-local
safeguards. Keep a single checker process initially and configure trusted proxy
hops for the actual ingress chain. Scale-out needs a shared or edge-enforced
budget.

## Live deployment

`https://insight.vexamail.com/` runs as a separate Enhance persistent app under
the Vexa Mail website on nova. Its working directory is
`services/vexa-insight-public`, its command is `sh start.sh`, its Node version
is `24.21.0`, and its port is `3003`. The startup script is maintained in
`deploy/public/start.sh`. It sets the public-only runtime and assumes two
trusted proxy hops for Cloudflare and Apache.

The hostname has a proxied Cloudflare A record and an origin certificate issued
by Enhance’s Let’s Encrypt integration. HTTP redirects to HTTPS. The application
directory contains no `.env` files or database directory. The app runtime was
built from revision `4319132`; the installed `REVISION` file records the full
SHA.

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
pnpm exec vitest run --config vitest.config.mts test/publicDomainCheck.test.ts test/publicSiteRouting.test.ts test/publicCheckRoute.test.ts
pnpm run type-check
pnpm run knip
pnpm run deps:graph
```

The tests cover domain validation, DNS failure semantics, duplicate policies,
null MX, public routing, startup isolation, rate limits, shared lookups, cache
behavior and concurrency limits. Production build and browser checks also verify
the proxy rewrite and client hydration.
