# Troubleshooting

Common failure modes encountered when running Vexa, with the most likely root
cause first and a concrete check or fix you can run.

## Container won't start

**Most likely cause:** the data volume is not writable by the container user, or
`DATABASE_URL` points at a path that does not exist.

Check the container logs:

```bash
docker logs vexa --tail=200
```

Look for one of:

- `SQLITE_CANTOPEN: unable to open database file` — the `data/` directory is not
  writable. Fix the host-side mount:

  ```bash
  sudo chown -R 1001:1001 ./data   # default container user/group
  chmod 755 ./data
  ```

- `Error: ENOENT: no such file or directory, mkdir './data'` — the volume mount
  is missing. Re-create with the correct `-v` flag:

  ```bash
  docker run -v "$(pwd)/data:/app/data" ...
  ```

- `getaddrinfo ENOTFOUND` from the IMAP poller — DNS is failing. Check the
  Docker network and the IMAP host name.

## `better-sqlite3` native build fails on host install

When running outside Docker (e.g. `pnpm install` on a developer machine),
`better-sqlite3` builds from source and requires a C toolchain.

**macOS:**

```bash
xcode-select --install
brew install python  # node-gyp needs Python
```

**Debian/Ubuntu:**

```bash
sudo apt-get install -y build-essential python3
```

**Windows:**

```powershell
npm install -g windows-build-tools     # PowerShell as Administrator
```

After installing the toolchain:

```bash
pnpm rebuild better-sqlite3
```

## `SQLITE_BUSY` during heavy ingestion

The default WAL mode plus a 5 s busy timeout handles most concurrent reads, but
parallel IMAP pollers writing the same DB can still see `SQLITE_BUSY`.

Check that WAL is enabled:

```bash
sqlite3 data/vexa.db 'PRAGMA journal_mode;'
# expected: wal
```

Increase the busy timeout (in `src/lib/db/client.ts`, future setting):

```sql
PRAGMA busy_timeout = 15000;
```

For sustained high-write workloads, reduce poller concurrency (one IMAP account
per cron tick) rather than scaling out replicas — SQLite is a single-writer
database.

## IMAP authentication fails

Symptoms: poller logs show `AUTH FAILED`, `Invalid credentials`, or
`Authentication mechanism not supported`.

Checks, in order:

1. **App password vs login password.** Gmail, Yahoo, Outlook reject the account
   login password for IMAP. Generate an app-specific password in the provider's
   security settings and use that.

2. **2FA / OAuth.** If the account has 2FA enabled, only OAuth or an app
   password will work — Vexa currently supports app passwords.

3. **TLS configuration.** Confirm port 993 + `secure: true`. Port 143 with
   STARTTLS is also supported, but the host must publish a valid certificate.

4. **Allowlist.** Some providers (notably ProtonMail, Fastmail) require
   explicitly enabling IMAP in the web account settings.

Quick connectivity test from the host:

```bash
openssl s_client -connect imap.gmail.com:993 -crlf -quiet
# then type:  a LOGIN user@example.com APP_PASSWORD
```

## "No reports yet" after IMAP setup

The dashboard shows zero reports even though IMAP credentials are valid.

Checklist, in order:

1. **Cron timing.** The poller runs every 60 minutes by default, and
   `Settings > Ingestion interval` changes that. Wait one tick after saving
   credentials, then check `Settings > Polling status` for the last run
   timestamp.

2. **Mailbox path.** Most ESPs deliver DMARC reports to the `INBOX` folder; some
   users have a filter routing them to a sub-folder. Confirm by logging into the
   mailbox and verifying the folder name matches the configured path.

3. **No new reports.** Reporters (Gmail, Yahoo, Microsoft, etc.) only send
   reports for domains that have a `_dmarc` TXT record with a valid `rua` tag.
   Validate with:

   ```bash
   dig +short TXT _dmarc.example.com
   ```

   Without an `rua=mailto:` field pointing at the polled mailbox, no reports
   will arrive.

4. **Parser failures.** Check `Settings > Ingestion log` for rows in error
   state. Parser failures keep the raw email in the mailbox; the poll advances
   past them.

## Install token rotated / lost

The first-run install token is logged on every boot until installation
completes. Once an instance is installed the token is gone, and what you do next
depends on what you actually need.

**You want to point it at a different mailbox.** You do not need the installer.
Change the account under `Settings > Ingestion`; the wizard configures nothing
that page cannot.

**You lost the admin password.** Reset it with the recovery CLI. It touches
accounts only:

```bash
docker exec -it vexa node dist/recovery.cjs \
  reset-password admin@example.com 'NewPassword123!'
```

`create-admin` and `promote-user` are available the same way. See
[Password recovery](../README.md#password-recovery).

**You lost every admin account.** Back up the database first, then clear the
accounts so `/install` unlocks and hands you a fresh token:

```bash
# Stop first: the database runs in WAL mode, so copying vexa.db from a running
# container silently leaves behind whatever is still in the -wal file.
docker stop vexa
docker run --rm -v vexa-data:/data -v "$PWD":/out alpine \
  sh -c 'cp /data/vexa.db* /out/'
docker start vexa
docker exec -it vexa node dist/recovery.cjs hard-reset --confirm
docker restart vexa
# new token appears in: docker logs vexa
```

The wizard then asks for an admin account only, and leaves the settings and the
ingested reports alone.

> **Never recover by deleting `app_settings`.** That row holds the instance
> configuration and every IMAP account, and deleting it does not reset the
> instance, it destroys them. The encryption key is not in there: since
> [ADR 0010](adr/0010-secret-key-is-environment-only.md) it is read from
> `SECRET_KEY` in the environment and nowhere else. Releases up to 0.2.2
> documented that delete here; it was wrong.

## `SECRET_KEY` missing or wrong

Two lines in the boot log point here.

`[secret] SECRET_KEY is not set on an installed instance` means the variable is
absent. The app still serves the reports it already has, but nothing can decrypt
a mailbox password, so ingestion never runs. Set the variable to the value the
instance was installed with and restart. The installer refuses to run at all
without it, so a fresh instance cannot reach this state by accident.

`[secret] app_settings.secret_key holds a key that SECRET_KEY does not match`
means the instance was installed before 0.2.3 and had its key rotated through
the old settings page, which wrote it into the database. Since
[ADR 0010](adr/0010-secret-key-is-environment-only.md) that column is never
read. Nothing is lost and nothing was changed: read the column out of the
database and set `SECRET_KEY` to it.

```bash
sqlite3 data/vexa.db "SELECT secret_key FROM app_settings WHERE id = 1;"
```

Treat that value as exposed once you have it — it has been sitting inside the
database it encrypts — and rotate once the instance is running again:

```bash
node dist/recovery.cjs rotate-key "$NEW_KEY"   # instance stopped
```

## Update check disabled or silent

If `Settings > Updates` reports "update check disabled":

- Confirm `VEXA_UPDATE_CHECK_ENABLED` is unset or `true` (not `0`/`false`).
- Confirm outbound HTTPS to `api.github.com` is allowed by the host firewall.
- The GitHub API rate-limits unauthenticated requests to 60/hour per IP; behind
  a NAT this is shared. Vexa caches results for 24 h to avoid this.

## Where to look first

| Symptom                            | First file/log to check                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| Container crash on boot            | `docker logs vexa --tail=200`                                                               |
| Migration failure                  | Same — look for `Migration` lines                                                           |
| IMAP errors                        | UI: `Settings > Polling status`; logs: lines beginning `[imap]`                             |
| Parser errors                      | UI: `Settings > Ingestion log`                                                              |
| Slow dashboard                     | Check `EXPLAIN QUERY PLAN` on suspect queries; verify indexes in `src/lib/db/schema/`       |
| 4xx on Server Actions behind proxy | Verify `VEXA_ALLOWED_ORIGINS` matches the public origin (see `docs/DEPLOY-BEHIND-PROXY.md`) |
