import { CheckCircle2, XCircle } from 'lucide-react'
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
        <h3 className="text-foreground text-lg font-bold">{title}</h3>
        {helpText && <InfoTooltip content={helpText} />}
      </div>
      {found ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Found
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-500">
          <XCircle className="h-3.5 w-3.5" />
          Not Found
        </span>
      )}
    </div>
  )
}
