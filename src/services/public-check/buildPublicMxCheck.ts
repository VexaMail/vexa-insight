import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { unknownPublicCheck } from './unknownPublicCheck'

export function buildPublicMxCheck(records: string[] | null): PublicCheck {
  if (records === null) return unknownPublicCheck('MX')
  const nullMx = records.includes('0 .')
  return {
    name: 'MX',
    status: records.length > 0 && !nullMx ? 'pass' : 'info',
    summary: nullMx
      ? 'This domain declares that it does not receive email.'
      : `${String(records.length)} mail server records found.`,
    recommendation: nullMx
      ? 'A null MX can be intentional for a domain that does not receive mail.'
      : 'MX records describe incoming mail routing. They do not prove that outgoing mail is authenticated or delivered.',
    records,
  }
}
