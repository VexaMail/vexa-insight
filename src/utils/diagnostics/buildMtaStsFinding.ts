import type {
  DiagnosticsFinding,
  DiagnosticsFindingsInput,
} from '@/types/diagnostics'
import { buildMtaStsModeFinding } from './buildMtaStsModeFinding'
import { mtaStsFindingBase } from './mtaStsFindingBase'
import { mtaStsPolicyId } from './mtaStsPolicyId'

export function buildMtaStsFinding({
  dns,
  checkedAt,
}: DiagnosticsFindingsInput): DiagnosticsFinding {
  const base = mtaStsFindingBase(dns)
  const policyUrl = `https://mta-sts.${dns.domain}/.well-known/mta-sts.txt`
  if (dns.mtaSts.raw === null) {
    return {
      ...base,
      severity: 'medium',
      state: 'No MTA-STS policy',
      detail: `No TXT record at _mta-sts.${dns.domain}: senders may deliver to your MX without verified TLS.`,
      recommendation: `Publish the TXT record and serve the policy at ${policyUrl}, starting with mode: testing.`,
      fix: {
        host: `_mta-sts.${dns.domain}`,
        value: `v=STSv1; id=${mtaStsPolicyId(checkedAt)}`,
      },
      tileValue: 'Missing',
      tileHint: 'Optional hardening',
    }
  }
  if (!dns.mtaSts.valid || !dns.mtaSts.policyFileAccessible) {
    const unreachable = dns.mtaSts.valid
    return {
      ...base,
      severity: 'high',
      state: unreachable
        ? 'Policy file unreachable'
        : 'Record does not validate',
      detail: unreachable
        ? `The TXT record exists but ${policyUrl} did not answer with a policy.`
        : 'The TXT record must read v=STSv1; id=<policy id>.',
      recommendation: `Serve the policy over HTTPS at ${policyUrl} with a valid certificate, then change the id.`,
      fix: null,
      tileValue: unreachable ? 'No policy' : 'Invalid',
      tileHint: unreachable ? 'TXT found, file missing' : 'TXT does not parse',
    }
  }
  return buildMtaStsModeFinding(dns)
}
