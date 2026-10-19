/**
 * The `_mta-sts` TXT value. `id` must change whenever the policy file does,
 * so a policy-derived timestamp such as `20260131T120000` is used.
 */
export function buildMtaStsTxtRecord(id: string): string {
  return `v=STSv1; id=${id.replace(/[^a-z0-9]/gi, '').slice(0, 32)}`
}
