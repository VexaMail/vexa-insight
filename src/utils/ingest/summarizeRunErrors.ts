import {
  RUN_ERROR_SUMMARY_MAX_ERRORS,
  RUN_ERROR_SUMMARY_MAX_LENGTH,
} from '@/constants/ingest'

/** The first errors of a run, bounded, for `job_runs.error_summary`. */
export function summarizeRunErrors(errors: readonly string[]): string | null {
  if (errors.length === 0) return null
  const shown = errors.slice(0, RUN_ERROR_SUMMARY_MAX_ERRORS)
  const more = errors.length - shown.length
  const text = [
    ...shown,
    ...(more > 0 ? [`(+${String(more)} more)`] : []),
  ].join('\n')
  return text.length > RUN_ERROR_SUMMARY_MAX_LENGTH
    ? `${text.slice(0, RUN_ERROR_SUMMARY_MAX_LENGTH - 1)}…`
    : text
}
