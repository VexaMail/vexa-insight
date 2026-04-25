import type { SpfValidationCategory } from '@/types/diagnostics'
import { analyzeAuthorization } from './analyzeAuthorization'
import { analyzeConfiguration } from './analyzeConfiguration'
import { analyzeDependencies } from './analyzeDependencies'
import { analyzeLimits } from './analyzeLimits'
import { analyzeSyntax } from './analyzeSyntax'

export function analyzeSpfRecord(
  spf: string | null,
  allSpfRecords: string[],
): SpfValidationCategory[] {
  if (!spf) {
    return [
      {
        category: 'Record Status',
        checks: [
          {
            name: 'SPF Record Published',
            passed: false,
            detail: 'No SPF record was found for this domain.',
          },
        ],
      },
    ]
  }

  const syntaxChecks = analyzeSyntax(spf, allSpfRecords)
  const configChecks = analyzeConfiguration(spf)
  const limitChecks = analyzeLimits(spf)
  const authChecks = analyzeAuthorization(spf)
  const depChecks = analyzeDependencies(spf)

  return [
    { category: 'Syntax & Formatting', checks: syntaxChecks },
    { category: 'Configuration', checks: configChecks },
    { category: 'Resource Limitations', checks: limitChecks },
    { category: 'Authorization & Scope', checks: authChecks },
    { category: 'Third-Party Dependencies', checks: depChecks },
  ]
}
