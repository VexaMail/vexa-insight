import { StatusPill } from '@/components/ui'
import { InfoTooltip } from './InfoTooltip'
import type { SectionHeaderProps } from './SectionHeaderProps'

export function SectionHeader({
  title,
  found,
  icon,
  helpText,
}: Readonly<SectionHeaderProps>) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex items-center gap-2">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        {helpText !== undefined && helpText !== '' && (
          <InfoTooltip content={helpText} />
        )}
      </div>
      <StatusPill tone={found ? 'success' : 'danger'} variant="solid" dot>
        {found ? 'Found' : 'Not found'}
      </StatusPill>
    </div>
  )
}
