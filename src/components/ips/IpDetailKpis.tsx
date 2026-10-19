import type { IpDetailContextProps } from '@/types/ips'
import { IpKpiTiles } from './IpKpiTiles'

/**
 * The four headline figures of a source: compact tiles two to a row on a
 * phone, so the authentication results come up sooner; feature tiles with
 * their trends from `sm`.
 */
export function IpDetailKpis({ ctx }: Readonly<IpDetailContextProps>) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        <IpKpiTiles ctx={ctx} variant="compact" />
      </div>
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
        <IpKpiTiles ctx={ctx} variant="feature" />
      </div>
    </div>
  )
}
