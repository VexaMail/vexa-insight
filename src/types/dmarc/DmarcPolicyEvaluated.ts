/**
 * Normalized `row.policy_evaluated` of one record, plus its raw `reason`
 * element for policy-override parsing.
 */
export type DmarcPolicyEvaluated = {
  disposition: string
  dkimResult: string
  spfResult: string
  reason: unknown
}
