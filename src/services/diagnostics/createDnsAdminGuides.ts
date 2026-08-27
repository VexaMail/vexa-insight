import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createDnsAdminGuides(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide[] {
  const guides: DiagnosticsAdminGuide[] = []

  if (dns.spf === null) {
    guides.push({
      id: 'missing-spf',
      severity: 'high',
      title: 'SPF is not published',
      summary:
        'The domain does not publish an SPF record and cannot declare which servers are authorized to send mail.',
      whyItMatters:
        'Without SPF, receivers cannot validate the Return-Path against an explicit allowlist of sending sources, which weakens DMARC and makes spoofing easier.',
      howToFix: `Publish a TXT record at ${dns.domain} that includes every legitimate sender. Start conservatively, for example \`v=spf1 include:your-esp.example ~all\`, and add each real provider before tightening to \`-all\`.`,
      verifySteps: [
        `dig TXT ${dns.domain} +short`,
        'Confirm there is only one SPF record starting with `v=spf1`.',
        'Verify that all legitimate ESPs and relays are covered.',
      ],
    })
  }

  if (dns.spf !== null && !dns.spfValid) {
    guides.push({
      id: 'invalid-spf',
      severity: 'high',
      title: 'SPF needs correction',
      summary:
        dns.spfWarning ??
        'The current SPF record is invalid or structurally incorrect.',
      whyItMatters:
        'An SPF record with syntax errors, multiple records, or too many lookups can trigger `PermError` and turn legitimate mail into authentication failures.',
      howToFix:
        'Reduce unnecessary `include` mechanisms, avoid multiple SPF records, and simplify the dependency tree. If you rely on several providers, consolidate their authorized ranges and IPs into a single `v=spf1` record.',
      verifySteps: [
        `dig TXT ${dns.domain} +short`,
        'Make sure there is only one SPF record.',
        'Review the number of `include`, `a`, `mx`, `exists`, and redirect mechanisms so you stay under 10 DNS lookups.',
      ],
    })
  }

  if (dns.spf !== null && dns.spfValid && dns.spfWarning !== null) {
    guides.push({
      id: 'spf-hardening',
      severity: 'low',
      title: 'SPF can be hardened',
      summary: dns.spfWarning,
      whyItMatters:
        'This is not an active authentication failure. It is a posture improvement that reduces ambiguity for unauthorized senders.',
      howToFix:
        'If you have already inventoried all legitimate senders and do not expect any new sending platforms, you can move from `~all` to `-all`. If you are still validating coverage, keeping `~all` is reasonable.',
      verifySteps: [
        `dig TXT ${dns.domain} +short`,
        'Confirm that all legitimate senders are included before switching to `-all`.',
        'Monitor DMARC reports after the change to catch false positives.',
      ],
    })
  }

  if (dns.dmarc === null) {
    guides.push({
      id: 'missing-dmarc',
      severity: 'high',
      title: 'DMARC is not published',
      summary:
        'There is no DMARC record for the domain, so there is no declared policy for mail that fails alignment.',
      whyItMatters:
        'Without DMARC there is no unified monitoring or enforcement policy, and recipients do not get clear instructions on visible-domain spoofing.',
      howToFix: `Publish a TXT record at _dmarc.${dns.domain}, starting with monitoring mode. A safe starting point is \`v=DMARC1; p=none; rua=mailto:dmarc@${dns.domain}\`. Once legitimate traffic is covered, move to \`quarantine\` or \`reject\`.`,
      verifySteps: [
        `dig TXT _dmarc.${dns.domain} +short`,
        'Confirm the record starts with `v=DMARC1`.',
        'Check that the `rua` mailbox exists and can receive reports.',
      ],
    })
  }

  if (dns.dmarc !== null && !dns.dmarcValid) {
    guides.push({
      id: 'invalid-dmarc',
      severity: 'high',
      title: 'DMARC has validation errors',
      summary: dns.dmarcWarnings.join(' ') || 'The DMARC record is invalid.',
      whyItMatters:
        'An invalid DMARC record can be ignored by receivers or interpreted inconsistently, leaving the domain without effective protection.',
      howToFix:
        'Fix the TXT syntax at `_dmarc` and keep only valid tags. Prioritize `v`, `p`, and `rua`, then review optional tags such as `pct`, `adkim`, `aspf`, or `fo`.',
      verifySteps: [
        `dig TXT _dmarc.${dns.domain} +short`,
        'Verify tag order and syntax.',
        'Confirm that `p=` has an allowed value: `none`, `quarantine`, or `reject`.',
      ],
    })
  }

  if (dns.dmarcPolicy === 'none') {
    guides.push({
      id: 'monitoring-only-dmarc',
      severity: 'medium',
      title: 'DMARC is monitoring only',
      summary:
        'The domain publishes DMARC, but the `p=none` policy does not block or quarantine mail that fails authentication.',
      whyItMatters:
        'Monitoring helps you observe coverage, but it does not prevent spoofed mail from being delivered when authentication fails.',
      howToFix:
        'Once SPF and DKIM cover legitimate traffic, gradually raise the policy to `quarantine` and then to `reject`. Do this only after authorized senders are inventoried.',
      verifySteps: [
        `dig TXT _dmarc.${dns.domain} +short`,
        'Check that SPF and DKIM alignment remain stable before tightening the policy.',
        'Monitor aggregate reports after the change to catch false positives.',
      ],
    })
  }

  if (!dns.dkimParsedRecords.some((record) => record.valid)) {
    guides.push({
      id: 'dkim-not-valid',
      severity: 'high',
      title: 'No valid DKIM selectors were detected',
      summary:
        'The DKIM probes did not detect any valid selector among the known selectors being checked.',
      whyItMatters:
        'If legitimate traffic depends on DKIM and the public keys are inaccessible or invalid, DMARC alignment can break even when SPF only partially succeeds.',
      howToFix:
        'Confirm which selectors each ESP really uses, publish their public keys at `<selector>._domainkey`, and review recent rotations. If a selector was revoked, make sure the sender no longer signs with it.',
      verifySteps: [
        `dig TXT selector1._domainkey.${dns.domain} +short`,
        'Validate the real selector in your ESP or outbound MTA.',
        'Confirm that the record includes `v=DKIM1` and a non-empty `p=` value.',
      ],
    })
  }

  if (dns.bimi.raw === null) {
    guides.push({
      id: 'missing-bimi',
      severity: 'low',
      title: 'BIMI is not configured',
      summary:
        'There is no BIMI record, and the domain does not publish a verifiable brand logo.',
      whyItMatters:
        'This usually does not break delivery, but it reduces brand visibility and often indicates that the domain has not completed more advanced trust layers yet.',
      howToFix: `Publish a TXT record at default._bimi.${dns.domain} with \`v=BIMI1; l=https://.../logo.svg\` and add a VMC certificate if your provider supports it.`,
      verifySteps: [
        `dig TXT default._bimi.${dns.domain} +short`,
        'Verify that the logo URL is reachable over HTTPS.',
        'If you use VMC, confirm that the `a=` field points to the correct certificate.',
      ],
    })
  }

  if (dns.mtaSts.raw === null) {
    guides.push({
      id: 'missing-mta-sts',
      severity: 'medium',
      title: 'MTA-STS is not published',
      summary:
        'The domain does not publish an MTA-STS policy to protect inbound SMTP delivery with validated TLS.',
      whyItMatters:
        'Without MTA-STS, a man-in-the-middle attacker can force downgrades or exploit insecure MX handling when other MTAs negotiate delivery to your domain.',
      howToFix:
        `Publish \`v=STSv1; id=<version>\` at _mta-sts.${dns.domain} and serve \`https://mta-sts.${dns.domain}/.well-known/mta-sts.txt\` with ` +
        'the entries `version: STSv1`, `mode: enforce|testing`, `mx:`, and `max_age:`.',
      verifySteps: [
        `dig TXT _mta-sts.${dns.domain} +short`,
        `curl -i https://mta-sts.${dns.domain}/.well-known/mta-sts.txt`,
        'Check that the `mx:` entries in the file match your real MX hosts.',
      ],
    })
  } else if (!dns.mtaSts.policyFileAccessible) {
    guides.push({
      id: 'mtasts-policy-unreachable',
      severity: 'high',
      title: 'The MTA-STS policy file is not reachable',
      summary:
        'The MTA-STS TXT record exists, but the `/.well-known/mta-sts.txt` file does not respond correctly over HTTPS.',
      whyItMatters:
        'The TXT record alone does not enable protection. If the file cannot be read, other MTAs cannot apply the policy.',
      howToFix:
        'Serve the policy file from `mta-sts.<domain>` with a valid TLS certificate, HTTP 200 status, and content that matches your real MX hosts.',
      verifySteps: [
        `curl -i https://mta-sts.${dns.domain}/.well-known/mta-sts.txt`,
        'Validate the TLS certificate for the `mta-sts` host.',
        'Confirm that the content includes `version`, `mode`, `mx`, and `max_age`.',
      ],
    })
  }

  if (dns.tlsRpt.raw === null) {
    guides.push({
      id: 'missing-tlsrpt',
      severity: 'low',
      title: 'TLS-RPT is not published',
      summary:
        'There is no TLS-RPT record, and no address is declared to receive inbound TLS failure reports.',
      whyItMatters:
        'TLS-RPT does not prevent failures by itself, but it provides operational visibility when there are TLS or MTA-STS policy problems.',
      howToFix: `Publish a TXT record at _smtp._tls.${dns.domain} with a value such as \`v=TLSRPTv1; rua=mailto:tlsrpt@${dns.domain}\` and enable delivery to that mailbox.`,
      verifySteps: [
        `dig TXT _smtp._tls.${dns.domain} +short`,
        'Check that the `rua` address exists and receives mail.',
      ],
    })
  }

  return guides
}
