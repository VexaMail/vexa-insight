import type { DiagnosticsGradeBandOption } from '@/types/diagnostics'

/** The grade quick filter of the diagnostics index, in reading order. */
export const DIAGNOSTICS_GRADE_BAND_OPTIONS: readonly DiagnosticsGradeBandOption[] =
  [
    { value: 'all', label: 'All', tone: 'neutral', countKey: 'total' },
    { value: 'poor', label: 'Poor', tone: 'danger', countKey: 'poor' },
    { value: 'fair', label: 'Fair', tone: 'warning', countKey: 'fair' },
    { value: 'good', label: 'Good', tone: 'success', countKey: 'good' },
    {
      value: 'unscored',
      label: 'Unscored',
      tone: 'unknown',
      countKey: 'unresolved',
    },
  ]
