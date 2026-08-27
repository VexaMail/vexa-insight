# Deploying Vexa behind a reverse proxy

Vexa is a Next.js app that listens on `localhost:3000` inside the container and
expects a single upstream. This guide covers the minimum config to terminate TLS
in front of it, preserve client IPs, and unblock Next.js Server Actions on a
non-loopback hostname.

## Required app config

Two env vars are required when the public hostname differs from
`http://localhost:3000`:

```bash
VEXA_ALLOW_REMOTE_INSTALL=1
VEXA_ALLOWED_ORIGINS=https://dmarc.example.com
```

- `VEXA_ALLOW_REMOTE_INSTALL=1` — the first-run installer rejects non-loopback
  requests by default. Set this to `1` when the install wizard is reached
  through the proxy.
- `VEXA_ALLOWED_ORIGINS` — comma-separated list of origins allowed to invoke
  Server Actions, read at request time (`proxy.ts`), so it works on a published
  image without rebuilding. Entries may be bare hosts (`dmarc.example.com`) or
  full origins (`https://dmarc.example.com`); the host must exactly match what
  the browser sends, including any explicit port. Wildcards are not supported.
  It is only needed when the proxy does not forward the public hostname in
  `Host`/`X-Forwarded-Host` (both configs below do); without either, all
  mutating UI actions return `403`.

## nginx (TLS terminator)

Minimal `/etc/nginx/sites-available/vexa.conf`:

```nginx
upstream vexa {
  server 127.0.0.1:3000;
  keepalive 32;
}

server {
  listen 443 ssl http2;
  server_name dmarc.example.com;

  ssl_certificate     /etc/letsencrypt/live/dmarc.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/dmarc.example.com/privkey.pem;

  # Streamed Server Action responses can exceed default buffer sizes.
  client_max_body_size 25m;
  proxy_buffering off;

  location / {
    proxy_pass http://vexa;
    proxy_http_version 1.1;
    proxy_set_header Connection           "";
    proxy_set_header Host                 $host;
    proxy_set_header X-Real-IP            $remote_addr;
    proxy_set_header X-Forwarded-For      $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto    $scheme;
    proxy_set_header X-Forwarded-Host     $host;
    proxy_read_timeout 60s;
  }

  # Healthcheck used by k8s/docker — bypasses access logs.
  location = /api/v1/health {
    access_log off;
    proxy_pass http://vexa;
  }
}

server {
  listen 80;
  server_name dmarc.example.com;
  return 301 https://$host$request_uri;
}
```

Reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Caddy (TLS via Let's Encrypt, zero-config)

`/etc/caddy/Caddyfile`:

```caddy
dmarc.example.com {
  encode zstd gzip
  reverse_proxy 127.0.0.1:3000 {
    header_up Host                {host}
    header_up X-Real-IP           {remote}
    header_up X-Forwarded-For     {remote}
    header_up X-Forwarded-Proto   {scheme}
    header_up X-Forwarded-Host    {host}
  }
}
```

Reload:

```bash
sudo systemctl reload caddy
```

Caddy provisions and renews certificates from Let's Encrypt automatically; no
manual `certbot` step.

## X-Forwarded-\* header preservation

Next.js relies on `X-Forwarded-Host` and `X-Forwarded-Proto` to construct
absolute URLs (used in OAuth callbacks, email links, etc.) and on the `Host`
header for Server Action origin validation. Both nginx and Caddy configs above
forward these correctly.

If you put another L7 proxy in front (e.g. CloudFront, Cloudflare), double-check
that it preserves these headers. CloudFront strips them by default — add an
Origin Request Policy that forwards `Host`, `X-Forwarded-For`,
`X-Forwarded-Proto`, `X-Forwarded-Host`.

## Sticky sessions / multi-replica

**Vexa is a single-instance app.** It writes to a local SQLite file, runs
in-process cron jobs (IMAP polling, geoip updates, update checks), and holds the
install-token state in memory. Running more than one replica will:

- Race on SQLite writes (`SQLITE_BUSY` storms).
- Trigger duplicate IMAP polls and double-ingest reports.
- Show inconsistent install state in the wizard.

If you must run Vexa behind a load balancer for L7/TLS reasons, point all
traffic at a single backend instance. Sticky sessions are **not** a workaround
for the cron race.

## Healthcheck

`/api/v1/health` returns `200 OK` with `{ "data": { "status": "ok" } }` when the
app is listening and the DB is reachable. Use it for:

- Docker `HEALTHCHECK` (already configured in the published image).
- Kubernetes `livenessProbe` and `readinessProbe`.
- External monitors (UptimeRobot, Pingdom, etc.).

Example k8s probe:

```yaml
livenessProbe:
  httpGet:
    path: /api/v1/health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 30
readinessProbe:
  httpGet:
    path: /api/v1/health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

## TLS termination at the proxy only

Vexa expects to receive plain HTTP from the proxy on `127.0.0.1:3000`. Do not
enable TLS on the Next.js process itself — terminate at the proxy and forward
over loopback. This keeps the certificate lifecycle in one place (the proxy) and
avoids double encryption costs.

## Verification

After config changes:

```bash
# 1. The browser must be served over HTTPS at the configured origin.
curl -I https://dmarc.example.com

# 2. The health endpoint must return 200 through the proxy.
curl -sf https://dmarc.example.com/api/v1/health

# 3. Server Actions must not return 403 (origin mismatch).
#    Easiest check: open the dashboard, click "Save" on any setting.
#    A 403 in the network panel means VEXA_ALLOWED_ORIGINS is wrong.
```
