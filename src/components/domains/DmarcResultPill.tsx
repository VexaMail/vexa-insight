import { StatusPill } from '@/components/ui'
import { describeAuthRate } from '@/utils/domains'
import { AuthResultPopover } from './AuthResultPopover'
import type { DmarcResultPillProps } from './DmarcResultPillProps'
import { ToneIcon } from './ToneIcon'

/**
 * The DMARC result of a source as a solid badge: Pass, Fail or the share.
 * Hover or tap it for the counts behind it.
 */
export function DmarcResultPill({
  pass,
  total,
}: Readonly<DmarcResultPillProps>) {
  const display = describeAuthRate(pass, total)
  const isPassOrFail = display.tone === 'success' || display.tone === 'danger'
  return (
    <AuthResultPopover detail={`DMARC: ${display.title}`}>
      <StatusPill
        tone={display.tone}
        variant="solid"
        icon={isPassOrFail ? <ToneIcon tone={display.tone} /> : null}
        className="min-w-[4.25rem]"
      >
        {display.label}
      </StatusPill>
    </AuthResultPopover>
  )
}
