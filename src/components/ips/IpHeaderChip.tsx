import type { IpHeaderChipProps } from '@/types/ips'

/** One small fact under the source's address. */
export function IpHeaderChip({
  icon,
  children,
  title,
}: Readonly<IpHeaderChipProps>) {
  return (
    <span
      title={title}
      className="border-border bg-card/60 text-muted-foreground inline-flex h-7 max-w-full min-w-0 items-center gap-1.5 rounded-md border px-2 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0"
    >
      {icon}
      <span className="truncate">{children}</span>
    </span>
  )
}
