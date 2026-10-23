# DKIM DNS diagnostics

Private diagnostics, domain DNS views and the DNS API probe both common
selectors and selectors observed signing the monitored domain in aggregate
reports. The common list includes Enhance's `hostingcp`. The public checker uses
common selectors or an explicitly supplied selector; it does not access private
reports.

DNS discovery cannot enumerate every selector. A missing common selector is
informational unless the selector was observed in the domain's reports. Key
presence does not establish that a message was signed or that its signature
verifies.

## Key validity and strength

The parser accepts a missing `v=` tag, which defaults to DKIM1, and joins the
chunks of one TXT record. It rejects ambiguous multiple key records, duplicate
tags, revoked keys and malformed public keys. RSA key size comes from the parsed
public key rather than an estimate based on the encoded byte count. Both
SubjectPublicKeyInfo and RSAPublicKey DER encodings are supported.

RSA keys below 1024 bits remain invalid. RSA keys from 1024 to 2047 bits are
usable with a separate recommendation to rotate to at least 2048 bits. Strength
recommendations do not invalidate the record or remove DKIM score credit.
Ed25519 keys are checked against their own 32-byte format, not RSA thresholds.
These distinctions follow
[RFC 8301 section 3.2](https://www.rfc-editor.org/rfc/rfc8301.html#section-3.2)
and the key-record rules in
[RFC 6376 section 3.6.1](https://www.rfc-editor.org/rfc/rfc6376.html#section-3.6.1).

The score and findings use parsed validity. Selector cards show strength
recommendations separately from errors. The optional warnings field remains
compatible with snapshots saved before this change.

## Verification

Run the regression checks from the repository root:

```bash
pnpm exec vitest run --config vitest.config.mts test/parseDkimRecord.test.ts test/dkimSelectorDiscovery.test.ts test/getDomainDnsRecords.test.ts test/getMonitoredDomainDnsRecords.test.ts test/dkimDiagnosticValidity.test.ts test/computeDomainScore.test.ts test/buildDiagnosticsFindings.test.ts test/buildDiagnosticsAdminGuides.test.ts test/diagnosticsAdminGuidesDns.test.ts test/publicDkimSelector.test.ts
```

The checks exercise selector discovery, provider-specific selectors, TXT
chunking, absent version tags, actual RSA key formats, weak/revoked/malformed
keys, RSA-1024 warnings, Ed25519 and consistent scoring/finding severity.
Fixtures contain disposable test public keys and no customer data or private
keys.
