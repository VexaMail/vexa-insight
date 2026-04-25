export function getDomainStatus(passRate: number): string {
  if (passRate >= 95) return 'Active'
  if (passRate >= 80) return 'Warning'
  return 'Critical'
}
