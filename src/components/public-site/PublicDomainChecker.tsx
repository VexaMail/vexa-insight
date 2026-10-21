'use client'

import type { PublicDomainCheckerProps } from '../../types/public-check/PublicDomainCheckerProps'
import { PublicCheckControls } from './PublicCheckControls'
import { PublicDomainPending } from './PublicDomainPending'
import { PublicHero } from './PublicHero'
import { PublicHowItWorks } from './PublicHowItWorks'
import { PublicProtocolStrip } from './PublicProtocolStrip'
import { PublicReport } from './PublicReport'
import { usePublicCheck } from './hooks/usePublicCheck'

export function PublicDomainChecker({
  initialDomain = '',
}: Readonly<PublicDomainCheckerProps>) {
  const { report, error, pending, submit, domain } =
    usePublicCheck(initialDomain)
  return (
    <div id="check">
      {!domain ? <PublicHero /> : null}
      {report ? <PublicReport report={report} /> : null}
      {domain && !report ? (
        <PublicDomainPending
          domain={domain}
          pending={pending || error === null}
        />
      ) : null}
      <PublicCheckControls
        hasReport={report !== null}
        domain={domain}
        pending={pending}
        submit={submit}
        error={error}
      />
      {!domain ? (
        <>
          <PublicProtocolStrip />
          <PublicHowItWorks />
        </>
      ) : null}
    </div>
  )
}
