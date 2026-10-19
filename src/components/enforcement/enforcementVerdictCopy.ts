import type { EnforcementVerdict } from '@/types/enforcement'
import type { StatusTone } from '@/types/ui'

/** Headline, short label, advice and tone for each readiness verdict. */
export const ENFORCEMENT_VERDICT_COPY: Record<
  EnforcementVerdict,
  { title: string; short: string; advice: string; tone: StatusTone }
> = {
  'insufficient-data': {
    title: 'Not enough data yet',
    short: 'Not enough data',
    advice:
      'Collect at least a week of reports and a hundred messages before judging whether enforcement is safe.',
    tone: 'unknown',
  },
  'fix-first': {
    title: 'Fix legitimate senders first',
    short: 'Fix first',
    advice:
      'Some mail from senders that normally authenticate would be quarantined or rejected. Align SPF or DKIM for the sources marked legitimate below, then check again.',
    tone: 'warning',
  },
  ready: {
    title: 'Ready to enforce',
    short: 'Ready',
    advice:
      'What fails is forwarded or unknown mail. Move to p=quarantine (optionally with pct= for a gradual start), watch a week of reports, then p=reject.',
    tone: 'success',
  },
}
