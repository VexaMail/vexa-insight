import type { RunbookStatCardProps } from './RunbookStatCardProps'

export function RunbookStatCard({
  label,
  children,
}: Readonly<RunbookStatCardProps>) {
  return (
    <div className="bg-background rounded-lg border px-3 py-2">
      <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
        {label}
      </p>
      <p className="text-foreground text-lg font-bold">{children}</p>
    </div>
  )
}
