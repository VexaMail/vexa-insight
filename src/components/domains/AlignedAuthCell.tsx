import { StatusPill } from '@/components/ui'
import { describeAuthRate } from '@/utils/domains'
import type { AlignedAuthCellProps } from './AlignedAuthCellProps'
import { AuthResultPopover } from './AuthResultPopover'
import { ToneIcon } from './ToneIcon'

/**
 * The aligned result of SPF or DKIM as the pill, and the raw authentication
 * result under it whenever the two differ, so neither is claimed for the other.
 * Hover or tap it for both results in words.
 */
export function AlignedAuthCell({
  name,
  aligned,
  authPass,
  total,
}: Readonly<AlignedAuthCellProps>) {
  const align = describeAuthRate(aligned, total)
  const auth = describeAuthRate(authPass, total)
  const isPassOrFail = align.tone === 'success' || align.tone === 'danger'
  return (
    <AuthResultPopover
      detail={`${name} aligned: ${align.title}. ${name} authentication: ${auth.title}.`}
    >
      <span className="flex flex-col items-start gap-0.5">
        <StatusPill
          tone={align.tone}
          variant="solid"
          icon={isPassOrFail ? <ToneIcon tone={align.tone} /> : null}
          className="min-w-[4.25rem]"
        >
          {align.label}
        </StatusPill>
        {auth.label === align.label ? null : (
          <span className="text-muted-foreground text-[11px] leading-none whitespace-nowrap">
            auth {auth.label.toLowerCase()}
          </span>
        )}
      </span>
    </AuthResultPopover>
  )
}
