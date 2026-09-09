import type { ProtocolStatusRowProps } from './ProtocolStatusRowProps'
import { protocolStatusConfig } from './protocolStatusConfig'

export function ProtocolStatusRow({
  protocol,
  status,
  detail,
  sectionId,
  onOpenDetails,
}: Readonly<ProtocolStatusRowProps>) {
  const config = protocolStatusConfig[status]
  const Icon = config.icon

  return (
    <button
      type="button"
      onClick={() => {
        onOpenDetails(sectionId)
      }}
      title={`Open ${protocol} details`}
      className="hover:bg-muted/50 focus-visible:ring-ring flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <span className="text-foreground text-sm font-medium">{protocol}</span>
      <div className="flex items-center gap-2">
        {detail !== undefined && detail !== '' && (
          <span className="text-muted-foreground hidden text-xs sm:inline">
            {detail}
          </span>
        )}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className} ${config.bgClassName}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </span>
      </div>
    </button>
  )
}
