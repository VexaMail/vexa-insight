import type { SourceVerdictOption } from '@/types/source-reviews'

/** The verdicts an operator can record, in the order the buttons show them. */
export const SOURCE_VERDICT_OPTIONS: readonly SourceVerdictOption[] = [
  { verdict: 'legitimate', label: 'Legitimate sender' },
  { verdict: 'forwarder', label: 'Forwarder' },
  { verdict: 'unauthorized', label: 'Unauthorized' },
]
