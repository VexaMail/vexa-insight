/** DMARC points by published policy, before the pct and rua adjustments. */
export const dmarcPolicyPoints = {
  reject: 50,
  quarantine: 35,
  none: 15,
} as const
