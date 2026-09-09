import type { ProtocolGroupCardProps } from './ProtocolGroupCardProps'

/** A titled card grouping the status rows of one mail direction. */
export function ProtocolGroupCard({
  icon,
  title,
  children,
}: Readonly<ProtocolGroupCardProps>) {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-foreground text-sm font-bold tracking-wide uppercase">
          {title}
        </h3>
      </div>
      <div className="flex flex-col divide-y">{children}</div>
    </div>
  )
}
