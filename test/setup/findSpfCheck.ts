import type { SpfCheckResult, SpfValidationCategory } from '@/types/diagnostics'

/** One named check of one category of an SPF analysis result. */
export function findSpfCheck(
  categories: SpfValidationCategory[],
  category: string,
  name: string,
): SpfCheckResult | undefined {
  return categories
    .find((c) => c.category === category)
    ?.checks.find((check) => check.name === name)
}
