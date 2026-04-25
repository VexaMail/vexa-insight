import { COMPLIANCE_GOOD_THRESHOLD } from './complianceGoodThreshold'
import type { ComplianceStyles } from './ComplianceStyles'
import { COMPLIANCE_WARN_THRESHOLD } from './complianceWarnThreshold'

export function getComplianceStyles(passRate: number): ComplianceStyles {
  const isGood = passRate >= COMPLIANCE_GOOD_THRESHOLD
  const isWarn =
    passRate >= COMPLIANCE_WARN_THRESHOLD &&
    passRate < COMPLIANCE_GOOD_THRESHOLD

  if (isGood) {
    return {
      textColor: 'text-success',
      barColor: 'bg-success',
      statusLabel: 'Active',
      statusClass: 'bg-success/10 text-success border-success/20',
    }
  }
  if (isWarn) {
    return {
      textColor: 'text-warning',
      barColor: 'bg-warning',
      statusLabel: 'Warning',
      statusClass: 'bg-warning/10 text-warning border-warning/20',
    }
  }
  return {
    textColor: 'text-danger',
    barColor: 'bg-danger',
    statusLabel: 'Critical',
    statusClass: 'bg-danger/10 text-danger border-danger/20',
  }
}
