import type { DnsDiagnostics, DomainScore } from '@/types/diagnostics'
import { scoreBimi } from './scoreBimi'
import { scoreDkim } from './scoreDkim'
import { scoreDmarc } from './scoreDmarc'
import { scoreMtaSts } from './scoreMtaSts'
import { scoreSpf } from './scoreSpf'
import { scoreTlsRpt } from './scoreTlsRpt'
import { scoreToGrade } from './scoreToGrade'

/**
 * SPF, DKIM and DMARC carry the whole 100-point core, because they are what
 * decides whether a spoofed message is rejected. MTA-STS, TLS-RPT and BIMI are
 * optional hardening and only add on top, capped at 100.
 */
export function computeDomainScore(dns: DnsDiagnostics): DomainScore {
  const checks = [
    scoreSpf(dns),
    scoreDkim(dns),
    scoreDmarc(dns),
    scoreMtaSts(dns),
    scoreTlsRpt(dns),
    scoreBimi(dns),
  ]

  const coreScore = checks
    .filter((check) => check.weight === 'core')
    .reduce((total, check) => total + check.earned, 0)
  const bonusScore = checks
    .filter((check) => check.weight === 'bonus')
    .reduce((total, check) => total + check.earned, 0)

  const percentage = Math.min(coreScore + bonusScore, 100)

  return {
    grade: scoreToGrade(percentage),
    percentage,
    coreScore,
    bonusScore,
    checks,
  }
}
