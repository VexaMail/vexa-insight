import { Panel } from '@/components/ui'
import { Calculator } from 'lucide-react'
import { DomainScoreBreakdown } from '../score/DomainScoreBreakdown'
import type { RunbookTabProps } from './RunbookTabProps'

/** How the score is built, then the runbook and the optional AI analysis. */
export function RunbookTab({ score, children }: Readonly<RunbookTabProps>) {
  return (
    <>
      <div id="score-breakdown" className="scroll-mt-6">
        <Panel
          icon={<Calculator />}
          title="How the score is built"
          description="SPF, DKIM and DMARC make up the 100 core points; MTA-STS, TLS-RPT and BIMI only add a bonus, capped at 100."
        >
          <DomainScoreBreakdown score={score} />
        </Panel>
      </div>
      {children}
    </>
  )
}
