import type { DomainScore } from '@/types/diagnostics'

/** A passing overall score, so grade never contributes a guide. */
export const GRADE_A_SCORE: DomainScore = { grade: 'A', percentage: 96 }
