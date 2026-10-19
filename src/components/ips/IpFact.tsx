import type { IpInfoRowProps } from '@/types/ips'

/** One labelled fact of the facts strip. */
export function IpFact({ label, children }: Readonly<IpInfoRowProps>) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-foreground mt-0.5 truncate text-sm font-medium">
        {children}
      </dd>
    </div>
  )
}
