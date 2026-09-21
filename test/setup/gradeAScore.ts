import type { DomainScore } from '@/types/diagnostics'
import { makeDomainScore } from './makeDomainScore'

/** A passing overall score, so grade never contributes a guide. */
export const GRADE_A_SCORE: DomainScore = makeDomainScore('A', 96)
