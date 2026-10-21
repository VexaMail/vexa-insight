import type { PublicCheck } from '../../types/public-check/PublicCheck'
import type { PublicSpfInspection } from '../../types/public-check/PublicSpfInspection'

export function buildExpandedPublicSpfCheck(
  check: PublicCheck,
  state: PublicSpfInspection,
): PublicCheck {
  const uncertain = state.uncertain && state.issues.length === 0
  return {
    ...check,
    status:
      state.issues.length > 0 ? 'attention' : uncertain ? 'unknown' : 'pass',
    points: state.issues.length > 0 ? 0 : uncertain ? null : 50,
    summary:
      state.issues.length > 0
        ? 'SPF dependencies need attention.'
        : uncertain
          ? 'SPF dependency checks could not finish.'
          : 'SPF record and include/redirect checks passed.',
    recommendation: [
      ...state.issues,
      ...(state.uncertain
        ? [
            'A dependency timed out, needs sender-specific macro expansion, or exceeded the scan budget.',
          ]
        : []),
      `Expanded lookup terms: ${String(state.lookups)}; void TXT dependency answers: ${String(state.voids)}. This is a static upper bound, not a sender evaluation. A/MX/exists/ptr address answers and their void lookups require message-specific evaluation. ~all is valid.`,
    ].join(' '),
  }
}
