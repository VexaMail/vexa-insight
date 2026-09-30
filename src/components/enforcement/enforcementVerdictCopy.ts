import type { EnforcementVerdict } from '@/types/enforcement'

/** Headline and advice shown for each readiness verdict. */
export const ENFORCEMENT_VERDICT_COPY: Record<
  EnforcementVerdict,
  { title: string; advice: string; tone: string }
> = {
  'insufficient-data': {
    title: 'Not enough data yet',
    advice:
      'Collect at least a week of reports and a hundred messages before judging whether enforcement is safe.',
    tone: 'border-zinc-300 dark:border-zinc-600',
  },
  'fix-first': {
    title: 'Fix legitimate senders first',
    advice:
      'Some mail from senders that normally authenticate would be quarantined or rejected. Align SPF or DKIM for the sources marked legitimate below, then check again.',
    tone: 'border-amber-500',
  },
  ready: {
    title: 'Ready to enforce',
    advice:
      'What fails is forwarded or unknown mail. Move to p=quarantine (optionally with pct= for a gradual start), watch a week of reports, then p=reject.',
    tone: 'border-emerald-500',
  },
}
