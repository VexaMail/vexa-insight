# TODO

> Known work that is not yet done, with enough context to pick each item up
> cold. Last reviewed: 2026-07-26. Bug reports and feature requests belong in
> GitHub Issues; this file tracks work the maintainers have already scoped.
>
> States: `[ ]` pending · `[~]` partial or unverified · `[!]` blocked · `[x]`
> verified complete · `[-]` obsolete or superseded. Closed work moves to
> `TODO_LOG.md`.

## Security

- [ ] Add a `.dockerignore`. The `Dockerfile` does `COPY . .` and the repository
      has no `.dockerignore`, so `docker build` from any working checkout copies
      `data/` into the image — including `data/vexa.db`, which holds the
      operator's `SECRET_KEY` in `app_settings`, the AES-GCM-encrypted IMAP
      password, and every ingested report with real domains and IP addresses.
      `.env` and `.env.local` go in the same way. Anyone who builds and pushes
      an image from a configured checkout publishes their own instance's
      secrets. Found 2026-08-25 while deploying to a real host. Smallest next
      step: add `.dockerignore` covering `data/`, `.env*`, `.next/`,
      `node_modules/`, `coverage/`, `evals/results/`, `.git/`, then confirm with
      `docker build` + `docker run --rm <img> ls /app/data` that the image
      carries no database.
- [ ] Keep the live database out of the build artifact. Next's file tracing
      follows the `DirAssetReference` that `services/geoip/updateDb.ts` creates
      on the data directory and copies the whole of `data/` into
      `.next/standalone/data` — 261 MB on the nova deploy, `vexa.db` included.
      So the secrets above leak into the build output even without Docker, and a
      stale duplicate of the database sits next to the real one waiting to be
      picked up by anything resolving `data/vexa.db` relative to the standalone
      root. The nova deploy script deletes it after every build, which is a
      workaround, not a fix. Smallest next step: declare
      `outputFileTracingExcludes` for `data/**` in `next.config.ts` and check
      that `.next/standalone/data` is absent after a build while GeoIP lookups
      still work through the absolute `GEODATADIR`.
- [!] Consider per-user API keys with real role mapping to replace the single
  shared `SECRET_KEY` (see ADR 0001, which states finer-grained keys need their
  own ADR). Less urgent since 2026-07-26, when the shared key stopped mapping to
  `admin` and got the fixed `API_KEY_PERMISSIONS` set instead, but the remaining
  gaps are unchanged: one secret for every client, no per-client attribution, no
  revocation without rotating for everyone. Needs product decisions before
  implementation: key scoping model, rotation and revocation UX, whether the
  existing shared `SECRET_KEY` keeps working during migration, and where hashed
  keys live in the schema. Blocked on those four answers, not on effort: an
  implementation that guesses them is worse than none. Smallest unblock: the
  owner picks a scoping model and a revocation story, ideally as an ADR
  alongside 0001, and the schema plus migration follow from it.

## Artificial Intelligence

- [ ] Confirm that OpenAI's reasoning models accept
      `response_format: { type: 'json_object' }`. `createOpenAiAdapter` sends it
      on every call and every prompt here depends on JSON mode, so if the
      o-series and GPT-5 reject it those models are still unusable despite the
      2026-07-26 parameter gate. Unresolved that day: the sources consulted
      confirmed the `max_tokens`/`temperature` split for reasoning models but
      said nothing definite about JSON mode, and `platform.openai.com` answered
      403 to an unauthenticated fetch. Same sources also note reasoning models
      are steered towards the Responses API rather than chat completions, which
      may be the real answer here. Smallest next step: read the
      structured-outputs guide with an account, or make one cheap metered call
      against a reasoning model.
- [ ] Check whether the Gemini and OpenRouter adapters need the same
      sampling-parameter gate. Both pass `temperature` through unconditionally.
      Checked partially on 2026-07-26 and left open rather than guessed at:
      Gemini takes the field in `generationConfig` and 2.5 Flash documents it
      (default 1, range 0-2), but nothing found covers the 3.x thinking models,
      and at least one upstream tracker treats per-model temperature support as
      varying — so "Gemini accepts it everywhere" is an assumption, not a
      finding. OpenRouter is a different shape entirely: it proxies models from
      every vendor, including the Claude 5 and GPT-5 families already known to
      reject the field, so the allow-list used for the direct providers would
      strip `temperature` from nearly everything; it more likely wants a
      deny-list keyed on the upstream family in the model slug. Smallest next
      step: read Gemini's current model-parameter table for the 3.x line, and
      decide the OpenRouter shape before writing any of it.
- [ ] Decide whether the diagnostics prompt should stop the model emitting
      markdown fences. The rewritten prompt still says "No markdown fences", and
      the parser strips them (`parseError` was null on all 10 eval runs), but 2
      of 6 runs on the new wording wrapped the JSON in a ```json fence where 0
      of 2 baseline runs did. Two baseline samples cannot establish that as a
      regression, and nothing breaks today. Smallest next step: 4 more baseline
      runs to see whether the rates actually differ before touching the wording.
- [!] Verify the diagnostics AI rollout plan against a live provider call
  (implemented 2026-07-24 with prompt+parser tests only; no end-to-end AI call
  was run). Blocked: needs a real provider API key and spends paid model quota,
  which this run has no authorization for. Smallest unblock: the user names the
  provider/key and authorizes one metered call.

## Agent Access

- [ ] Build a machine-first access surface so agents can query the instance
      without driving the UI (owner request, 2026-08-18). Concrete first
      consumer: the hosting-estate sessions, where an agent answered "is the
      estate clean enough to raise p=none -> quarantine?" by SSH-ing into the
      mail server and parsing 979 RUA reports with ad-hoc scripts — everything
      it needed (per-domain pass/fail, failing sources, alignment detail for
      own-server mail) already exists behind the dashboard, but only as rendered
      pages. Wants a product decision on shape before code: (a) a documented
      read-only REST surface over the existing queries (domains, top senders,
      per-domain alignment breakdown, ingestion health) returning JSON; (b) a
      CLI wrapper on top of that; (c) an MCP server exposing the same queries as
      tools, which is the shape agents consume natively. These are layers, not
      alternatives — (a) is the foundation either way. Auth is the real
      coupling: today the only key is the shared `SECRET_KEY` with fixed
      `API_KEY_PERMISSIONS`, so a read-only agent key ties directly into the
      blocked per-user API-key item above (ADR 0001) — an agent surface is
      exactly the client that wants a scoped, revocable key rather than the
      master secret. Smallest next step: pick the endpoint list from the queries
      the 2026-08-18 hosting-estate session actually ran (they are the demand, written
      down in that repo's `scripts/dmarc-report-summary.sh` and `TODO_LOG.md`),
      and decide whether the agent key rides the existing shared-key model or
      waits for ADR 0001's successor.

## Infrastructure

- [ ] Make a clean checkout build. `pnpm run build` fails on a machine that has
      never run the app: `geoip-lite` is loaded while Next collects page data
      for `/api/v1/admin/geoip/refresh` and opens
      `data/geoip/geoip-country.dat`, which `.gitignore` excludes and which only
      exists after an authenticated MaxMind download triggered from the running
      app. The error is `Failed to collect page data`, with no hint that GeoIP
      data is the cause. This breaks every first-time contributor, every CI
      image build, and it blocked the nova deploy on 2026-08-25 until 210 MB of
      `.dat` files were copied over by hand. Smallest next step: stop pulling
      `geoip-lite` into the module graph at build time — a lazy `await import`
      inside the handler, or `export const dynamic = 'force-dynamic'` on that
      route — then verify with `git clone` into a fresh directory,
      `pnpm install && pnpm run build`, no `data/` present.
- [ ] Make `VEXA_ALLOWED_ORIGINS` a runtime value. `next.config.ts` calls
      `getAllowedOriginsFromEnv()` and bakes the result into
      `serverActions.allowedOrigins` at build time, but `.env.example`,
      `docs/DEPLOY-BEHIND-PROXY.md` and `docker-compose.yml` all present it as
      runtime configuration. The published image therefore ships
      `allowedOrigins: []` and every Server Action answers 403 behind any proxy
      with a hostname of its own — the exact deployment the doc describes.
      Confirmed on nova 2026-08-25 by reading the baked config out of
      `.next/standalone/server.js`; the deploy works only because the build
      itself is given the variable. Smallest next step: decide between reading
      the origin at request time (a proxy check against the `Host`/forwarded
      headers) and documenting the variable as build-time-only; either way the
      Docker path needs to stop promising something it cannot deliver.
- [ ] Fix `deploy/vexa.service`. Its `ExecStart=/usr/bin/env pnpm run start`
      runs `next start`, which Next 16 rejects for this project —
      `"next start" does not work with "output: standalone" configuration` — and
      the unit sets no `HOSTNAME`, so the server binds `0.0.0.0` and publishes
      itself on every interface of the host. On nova that briefly exposed port
      3002 on the public IP, saved only by the firewall. Smallest next step:
      point `ExecStart` at `node .next/standalone/server.js`, add
      `Environment=HOSTNAME=127.0.0.1`, and document the standalone assembly
      step (`public/`, `.next/static/` and `drizzle/` have to be copied into
      `.next/standalone/`) that the unit silently assumes.
- [!] Re-upgrade `typescript` to a plain spec once typescript-eslint supports
  TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias
  interop: `typescript` -> `@typescript/typescript6` (JS API for
  eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by
  `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist
  because `eslint-config-next` pins 8.59.x. Re-checked 2026-07-26: unchanged —
  8.65.0 is still `latest` and both it and the 8.65.1-alpha.7 canary declare
  `typescript >=4.8.4 <6.1.0`. See ADR 0005.

## Documentation

- [ ] Stop advertising PostgreSQL and MySQL. `README.md` says the database is
      switchable "via `DATABASE_URL`; no app code changes" and carries a
      "Switching to PostgreSQL or MySQL" section, and `.env.example` repeats it.
      The code supports neither: `lib/db/client.ts` imports `better-sqlite3` and
      `drizzle-orm/better-sqlite3` directly, every schema file uses
      `drizzle-orm/sqlite-core`, `drizzle.config.ts` pins `dialect: 'sqlite'`,
      and all 30+ migrations are SQLite DDL. Someone who points `DATABASE_URL`
      at Postgres gets a crash, not a database. Decide which: delete the claim,
      or implement multi-dialect support behind it. Deleting is the honest
      default until someone needs it — this is a public repository and the
      promise is load-bearing for anyone choosing the project.
- [ ] Correct the health endpoint in `docs/DEPLOY-BEHIND-PROXY.md`. It documents
      `/api/health` returning `{ "ok": true }` in the nginx snippet, the
      Kubernetes probes and the smoke-test command. The route is
      `/api/v1/health` and it returns `{"data":{"status":"ok"}}`; `/api/health`
      answers 404, verified on the nova deploy 2026-08-25. Anyone copying those
      probes gets pods that never pass readiness. `Dockerfile` and
      `deploy/k8s/deployment.yaml` already use the correct path, so only the doc
      is wrong.

## Performance

- [-] Stop re-fetching envelopes for folders that never carry DMARC mail.
  Decided 2026-08-26: not this project's problem to solve. With
  `ingestion_include_all_folders` on, `processFolder` runs one IMAP
  `SEARCH SINCE` per folder and then bulk-fetches the envelope of every UID it
  returns, because the DMARC subject test (`isDmarcCandidate`) and the
  `processed_messages` de-duplication both need the envelope. Measured on the
  nova mailbox: a `.Logs` folder holds 5,038 messages of which 5,037 fall inside
  the 30-day window, so every hourly run pulls ~5,000 envelopes to discard all
  of them, while the run's real work is 1-22 reports. The 30-day window added on
  2026-08-25 does not help — the noise folder is entirely recent, so bounding by
  date bounds nothing. The owner is moving that log mail out to a separate
  processor, which removes the cost at source and is cheaper than a folder
  allow-list plus its migration and UI. Reopen only if a mailbox shows the same
  cost with no way to drain the noisy folder.

- [ ] Revisit rollup-style pre-aggregation for `getTopIpSenders` once the
      dataset justifies it. Measured 2026-07-26 against the local dev DB (6,901
      `normalized_events`, 2,178 `raw_reports`, 899 IPs, 51 domains): the query
      returns in ~20ms, most of it `sqlite3` CLI overhead, so a rollup table
      would be speculative complexity today. The 2026-07-26 domain-scoping
      change also improved the restricted-user path from
      `SCAN normalized_events` to
      `SEARCH ... USING INDEX event_domain_end_count_idx`. Reconsider when
      `normalized_events` reaches the "millions of rows" the
      `event_rollup_daily` doc comment describes; the rollup would need
      `domain_id` in its key to stay compatible with the allow-list filter, plus
      a migration, ingest-transaction maintenance, a backfill path, and an ADR
      0008-style consistency test.

## Pending Decisions

- [!] Match the domain score to PowerDMARC's output exactly. Decided 2026-07-26:
  parity is the goal, so any divergence in the
  SPF/DKIM/DMARC/BIMI/MTA-STS/TLS-RPT weights is a bug, not a design choice.
  Blocked on reference data this run cannot obtain: PowerDMARC's scores are
  behind their account, and scraping or signing up for a third-party service is
  not something to do unattended. Smallest unblock: the user supplies a handful
  of domains with PowerDMARC's reported score for each (a spread of
  good/partial/broken configurations is worth more than many similar ones); then
  `computeDomainScore` can be diffed against them and the weights tuned, with
  the reference set pinned as a test. Note 2026-07-24: the DKIM key-length
  estimator fix changed reported bit values, so any reference capture must
  post-date it.

## Future Ideas

Product/design work, deliberately not started autonomously: each one changes
what the diagnostics page _is_, so it wants a brief on the intended reading
order and information hierarchy before any code.

- [ ] Redesign the diagnostics page as one editorial narrative instead of
      stacked cards.
- [ ] Add expand/collapse controls to each protocol section.
- [ ] Generate copy-ready DNS examples from the inspected domain's real values
      instead of generic placeholders.

## Limpieza de ramas

- [ ] **15 ramas `dependabot/*` abiertas en origin.** Son PRs de bot, no
      trabajo: borrarlas no pierde nada porque Dependabot las regenera si la
      actualizacion sigue aplicando. Se dejaron el 2026-08-25 al limpiar el
      resto de ramas, para no cerrar PRs sin mirarlos. O se mergean los que
      sigan siendo validos, o se borran de golpe.

```bash
git ls-remote --heads origin | grep dependabot \
  | sed 's|.*refs/heads/||' | xargs -n 20 git push origin --delete
```

## Baseline gate debt

Frozen when the repo adopted the shared `@busirocket/*` toolchain. Every gate
passes today; each entry below is a pre-existing finding held in place by a
named exemption rather than a wildcard, so new violations of the same rule still
fail.

Most of this is gone as of 2026-08-27. The knip exemptions went first: the 23
dead files, the 124 unused exports and the nine unused dependencies were deleted
rather than ignored, so `knip.config.ts` carries no `ignore` list, no
`ignoreDependencies` and no rule override. The dependency-cruiser exemptions
followed: all 77 barrel-mediated cycles are gone, so `no-circular` runs
unnarrowed and the two stale orphan exemptions are deleted. What remains below
is what those passes did not reach.

- [!] Replace the 391-line hand-rolled `eslint.config.ts` with the shared
  `@busirocket/eslint-config` factories. It assembles `eslint-config-next` plus
  boundaries, code-policy, promise, security, sonarjs, unicorn and
  unused-imports by hand, including workarounds for "Cannot redefine plugin".
  Attempted 2026-08-27 with `@busirocket/eslint-config@0.7.3` and reverted;
  blocked on the source work below, not on the config.

      The swap itself is easy. What it costs is the point: adopting the
      factories' real rule surface produces **886 violations**, and holding the
      old surface means filtering every new rule back out, which buys the
      indirection of a shared config with none of its hardening. Measured:

      - 252 auto-fixable, but `--fix` is not safe here. Applied across 87
        files it produced three type errors on its own
        (`no-unnecessary-type-assertion` stripped an `as string | null` that
        TanStack's `row.getValue` genuinely needs; `jsx-no-leaked-render`
        turned `checked={a && !b}` into a ternary yielding `null`). The other
        85 `jsx-no-leaked-render` rewrites change render output for falsy
        values and type-check cannot validate them — they need reading.
      - 634 manual, led by `restrict-template-expressions` (251),
        `require-await` (69), `no-unnecessary-condition` (68),
        `no-unnecessary-type-conversion` (51). Among them 49 real
        accessibility findings (`click-events-have-key-events` 22,
        `no-static-element-interactions` 22, `label-has-associated-control` 5)
        that are worth fixing on their own merits, config migration or not.

      Smallest next step: treat the accessibility findings as their own task,
      independent of this entry; they are genuine defects rather than lint
      noise. Then adopt the factories rule-group by rule-group, each with its
      own diff, rather than as one 886-violation switch.

- [ ] Re-check `extract-zip`: the advisory names `>=2.0.2` and no such release
      exists. Closed here by overriding `@puppeteer/browsers` to `^3.2.1`, which
      dropped the dependency for `modern-tar`. Drop the override if `@lhci/cli`
      ever ships a version that no longer needs it.
