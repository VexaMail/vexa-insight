import type { IpInfoRowProps } from '@/types/ips'

/** One label/value row of the source information panel. */
export function IpInfoRow({ label, children }: Readonly<IpInfoRowProps>) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-4 py-1.5">
      <dt className="text-muted-foreground shrink-0 text-sm">{label}</dt>
      <dd className="text-foreground flex min-w-0 items-center justify-end gap-1 text-right text-sm">
        {children}
      </dd>
    </div>
  )
}
