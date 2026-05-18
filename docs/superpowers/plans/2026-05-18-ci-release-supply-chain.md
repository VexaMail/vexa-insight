# CI/Release Supply Chain Hardening Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Harden CI + release workflows so the published Docker image and the GitHub Release artifacts are reproducible, scanned, signed, and tied to source. Add CODEOWNERS so branch protection has someone to require reviews from.

**Architecture:** Three layers. (1) CI runs on every PR/push to `main` with least-privilege token, full quality gate, Docker smoke, CodeQL, and dependency audit. (2) Release workflow on tag push builds the multi-arch image, generates a CycloneDX SBOM, signs with cosign keyless OIDC, and attests SLSA build provenance. (3) `.github/CODEOWNERS` declares the maintainer.

**Tech Stack:** GitHub Actions, pnpm 11, Docker Buildx, anchore/sbom-action, actions/attest-build-provenance, sigstore/cosign-installer, github/codeql-action.

---

## Decisions made

1. **SHA-pin all third-party actions.** `actions/*` (first-party) also get SHA-pinned for defense-in-depth.
2. **CI uses `--frozen-lockfile`** for reproducibility.
3. **Docker smoke runs in CI** as a separate job that depends on the build job. Uses the existing `scripts/smoke.sh` with shortened timeouts.
4. **CodeQL** runs on PR + push + a weekly cron schedule.
5. **`pnpm audit`** runs at `--audit-level=high` and fails the build. Use `|| true` only if the audit creates noise; prefer hard fail.
6. **SBOM** is CycloneDX. Attached to the GitHub Release as a release asset AND attested as a build attestation.
7. **Cosign keyless OIDC** signing. No long-lived key.
8. **Build provenance** via `actions/attest-build-provenance` — official GitHub action, no extra setup.
9. **CODEOWNERS**: `* @cristiandeluxe` (single maintainer; can be expanded later).

## File structure

### Modify
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`

### Create
- `.github/workflows/codeql.yml`
- `.github/CODEOWNERS`
- `.github/dependabot.yml` (already exists — verify)

---

## Task 1 — CI workflow hardening

**Files:** `.github/workflows/ci.yml`

Replace with the structure below. Each `uses:` line is SHA-pinned; the implementer must look up the current published SHA for each action via `gh api` or `git ls-remote https://github.com/<owner>/<repo>.git refs/tags/v<version>` and embed it inline. SHAs change over time; pin to a real commit at execution time, not the SHA in this plan document.

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality-gate:
    name: Lint + Type-check + Format + Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@<SHA-of-v4>
      - name: Setup pnpm
        uses: pnpm/action-setup@<SHA-of-v3>
        with:
          version: 11.1.2
      - name: Setup Node
        uses: actions/setup-node@<SHA-of-v4>
        with:
          node-version: 22
          cache: pnpm
      - name: Install (frozen lockfile)
        run: pnpm install --frozen-lockfile
      - name: Quality gate
        run: pnpm run check:ci

  build:
    name: Next.js Build
    needs: quality-gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA-of-v4>
      - uses: pnpm/action-setup@<SHA-of-v3>
        with: { version: 11.1.2 }
      - uses: actions/setup-node@<SHA-of-v4>
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build

  docker-smoke:
    name: Docker build + smoke
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA-of-v4>
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@<SHA-of-v3>
      - name: Run smoke test
        env:
          VEXA_SMOKE_PORT: 14000
        run: bash scripts/smoke.sh

  dep-audit:
    name: Dependency audit
    needs: quality-gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA-of-v4>
      - uses: pnpm/action-setup@<SHA-of-v3>
        with: { version: 11.1.2 }
      - uses: actions/setup-node@<SHA-of-v4>
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - name: pnpm audit
        run: pnpm audit --audit-level=high
```

Notes for the implementer:
- Use `gh api repos/actions/checkout/git/refs/tags/v4.2.2` (or `git ls-remote --tags https://github.com/actions/checkout v4*`) to resolve each tag to a commit SHA. Pin the immutable SHA, and put the human-readable version on the same line as a comment: `uses: actions/checkout@<sha> # v4.2.2`.
- The pnpm version `11.1.2` matches the `packageManager` field in `package.json`.

### Verification

```bash
gh workflow run ci.yml --ref main   # only after push
```
Locally:
```bash
# Sanity: the smoke script the workflow calls is committed
test -x scripts/smoke.sh && echo OK
```

### Commit

```bash
git add .github/workflows/ci.yml
git commit -m "ci: harden quality gate (least-privilege token, frozen lockfile, SHA-pinned actions, build/smoke/dep-audit jobs)"
```

---

## Task 2 — CodeQL workflow

**Files:** create `.github/workflows/codeql.yml`

```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'  # weekly Monday 06:00 UTC

permissions:
  actions: read
  contents: read
  security-events: write

jobs:
  analyze:
    name: Analyze (javascript-typescript)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA-of-v4>
      - name: Init CodeQL
        uses: github/codeql-action/init@<SHA-of-v3>
        with:
          languages: javascript-typescript
          queries: security-and-quality
      - name: Autobuild
        uses: github/codeql-action/autobuild@<SHA-of-v3>
      - name: Analyze
        uses: github/codeql-action/analyze@<SHA-of-v3>
        with:
          category: '/language:javascript-typescript'
```

Resolve each `@<SHA-of-v3>` via `gh api repos/github/codeql-action/git/refs/tags/v3` (codeql-action publishes `v3` and a sub-version like `v3.27.0`; pin the latest stable).

### Commit

```bash
git add .github/workflows/codeql.yml
git commit -m "ci: add CodeQL workflow (PR + push + weekly Monday cron)"
```

---

## Task 3 — Release workflow hardening (SBOM + provenance + cosign)

**Files:** `.github/workflows/release.yml`

The existing release workflow already does build → release → multi-arch image push. We add SBOM, provenance, and cosign keyless signing. We also SHA-pin all actions.

Replace the file content with (resolve real SHAs at execution time):

```yaml
name: Release

on:
  push:
    tags:
      - 'v*.*.*'

permissions:
  contents: write
  packages: write
  id-token: write          # needed for cosign keyless + attestations
  attestations: write      # needed for actions/attest-build-provenance

jobs:
  release:
    name: GitHub Release
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.value }}
    steps:
      - uses: actions/checkout@<SHA-of-v4>
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@<SHA-of-v3>
        with: { version: 11.1.2 }
      - uses: actions/setup-node@<SHA-of-v4>
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Resolve and verify version
        id: version
        env:
          REF_NAME: ${{ github.ref_name }}
        run: |
          set -euo pipefail
          tag="${REF_NAME#v}"
          pkg_version="$(node -p "require('./package.json').version")"
          if [ "$tag" != "$pkg_version" ]; then
            echo "Tag $REF_NAME does not match package.json version $pkg_version" >&2
            exit 1
          fi
          echo "value=$tag" >> "$GITHUB_OUTPUT"

      - name: Quality gate
        run: pnpm run check:ci

      - name: Build
        run: pnpm run build

      - name: Generate SBOM (CycloneDX)
        uses: anchore/sbom-action@<SHA-of-v0>
        with:
          format: cyclonedx-json
          output-file: sbom.cdx.json
          artifact-name: vexa-mail-insight-sbom-${{ steps.version.outputs.value }}.cdx.json

      - name: Publish GitHub Release
        uses: softprops/action-gh-release@<SHA-of-v2>
        with:
          generate_release_notes: true
          draft: false
          prerelease: ${{ contains(github.ref_name, '-') }}
          files: sbom.cdx.json

  docker:
    name: Docker image (multi-arch) + SBOM attestation + cosign
    needs: release
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      id-token: write
      attestations: write
    steps:
      - uses: actions/checkout@<SHA-of-v4>

      - uses: docker/setup-qemu-action@<SHA-of-v3>
      - uses: docker/setup-buildx-action@<SHA-of-v3>

      - name: Log in to GHCR
        uses: docker/login-action@<SHA-of-v3>
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Compute image tags
        id: meta
        uses: docker/metadata-action@<SHA-of-v5>
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
            type=raw,value=latest,enable=${{ !contains(github.ref_name, '-') }}
          labels: |
            org.opencontainers.image.title=Vexa Mail Insight
            org.opencontainers.image.description=Open-source DMARC observability platform
            org.opencontainers.image.licenses=Apache-2.0

      - name: Build and push image
        id: build
        uses: docker/build-push-action@<SHA-of-v6>
        with:
          context: .
          push: true
          platforms: linux/amd64,linux/arm64
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          provenance: true
          sbom: true

      - name: Cosign installer
        uses: sigstore/cosign-installer@<SHA-of-v3>

      - name: Sign image (keyless)
        env:
          DIGEST: ${{ steps.build.outputs.digest }}
          TAGS: ${{ steps.meta.outputs.tags }}
        run: |
          set -euo pipefail
          while IFS= read -r tag; do
            cosign sign --yes "${tag}@${DIGEST}"
          done <<< "$TAGS"

      - name: Attest build provenance
        uses: actions/attest-build-provenance@<SHA-of-v2>
        with:
          subject-name: ghcr.io/${{ github.repository }}
          subject-digest: ${{ steps.build.outputs.digest }}
          push-to-registry: true
```

Notes:
- `docker/build-push-action@v6` already supports `provenance: true` and `sbom: true` natively (adds the OCI attestation manifest). The dedicated `actions/attest-build-provenance` step layers GitHub's SLSA attestation on top.
- `cosign sign --yes` uses ambient OIDC from `id-token: write`. No key file. Verifiable later with `cosign verify ghcr.io/vexamail/vexa-insight-dashboard:vX.Y.Z --certificate-identity-regexp '^https://github\.com/VexaMail/vexa-insight-dashboard/' --certificate-oidc-issuer https://token.actions.githubusercontent.com`.

### Commit

```bash
git add .github/workflows/release.yml
git commit -m "ci(release): SHA-pin actions; add CycloneDX SBOM, SLSA provenance, cosign keyless image signing"
```

---

## Task 4 — CODEOWNERS

**Files:** create `.github/CODEOWNERS`

```
# Default owner — every file
*       @cristiandeluxe

# Security-sensitive paths get explicit ownership
/services/security/      @cristiandeluxe
/services/crypto/        @cristiandeluxe
/services/auth/          @cristiandeluxe
/services/install/       @cristiandeluxe
/services/api/withApiAuth.ts  @cristiandeluxe
/.github/                @cristiandeluxe
/SECURITY.md             @cristiandeluxe
```

### Commit

```bash
git add .github/CODEOWNERS
git commit -m "chore(repo): add CODEOWNERS so branch protection has a default reviewer"
```

---

## Self-review

- All three workflow files use `permissions:` blocks with the minimum required scopes.
- Every action `uses:` line is pinned to an immutable commit SHA with a trailing version comment.
- The release workflow produces: a GitHub Release with SBOM asset, a multi-arch ghcr image with OCI provenance + SBOM attestations, a cosign keyless signature, and a SLSA build-provenance attestation.
- CI smoke uses the existing `scripts/smoke.sh`.
- CodeQL runs on PR + push + weekly cron with `security-and-quality` query pack.
- CODEOWNERS includes a wildcard plus explicit ownership for security-sensitive folders.
