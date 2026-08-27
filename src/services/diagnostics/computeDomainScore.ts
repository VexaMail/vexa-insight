import type { DnsDiagnostics, DomainScore } from '@/types/diagnostics'
import { scoreBimi } from './scoreBimi'
import { scoreDkim } from './scoreDkim'
import { scoreDmarc } from './scoreDmarc'
import { scoreMtaSts } from './scoreMtaSts'
import { scoreSpf } from './scoreSpf'
import { scoreTlsRpt } from './scoreTlsRpt'
import { scoreToGrade } from './scoreToGrade'

export function computeDomainScore(dns: DnsDiagnostics): DomainScore {
  const score =
    scoreSpf(dns) +
    scoreDkim(dns) +
    scoreDmarc(dns) +
    scoreBimi(dns) +
    scoreMtaSts(dns) +
    scoreTlsRpt(dns)
  const grade = scoreToGrade(score)

  return { grade, percentage: score }
}
