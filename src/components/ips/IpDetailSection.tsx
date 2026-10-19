import { Panel } from '@/components/ui'
import type { IpDetailSectionProps } from './IpDetailSectionProps'

/** A detail list panel: title, its own toolbar, then the rows. */
export function IpDetailSection({
  title,
  toolbar,
  children,
}: Readonly<IpDetailSectionProps>) {
  return (
    <Panel title={title}>
      <div className="flex flex-col gap-4">
        {toolbar}
        <div className="flex min-w-0 flex-col gap-2">{children}</div>
      </div>
    </Panel>
  )
}
