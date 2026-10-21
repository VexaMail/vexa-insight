'use client'

import type { PublicDomainCheckerProps } from '../../types/public-check/PublicDomainCheckerProps'
import { PublicCheckFeedback } from './PublicCheckFeedback'
import { PublicCheckForm } from './PublicCheckForm'
import { PublicDomainHeading } from './PublicDomainHeading'
import { PublicHero } from './PublicHero'
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
      {!domain ? (
        <div className="pt-10">
          <PublicHero />
        </div>
      ) : null}
      <div className={!domain ? 'mt-10' : ''}>
        <PublicCheckForm domain={domain} pending={pending} submit={submit} />
      </div>
      <div className={domain ? 'min-h-[60rem]' : ''}>
        {domain && !report ? <PublicDomainHeading domain={domain} /> : null}
        <PublicCheckFeedback pending={pending} error={error} />
        {report ? <PublicReport report={report} /> : null}
      </div>
      {!domain ? <PublicProtocolStrip /> : null}
    </div>
  )
}
