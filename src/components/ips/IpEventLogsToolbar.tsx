'use client'

import { ipLogsSortOptions } from '@/constants/ips'
import type { IpLogsSort } from '@/types/ips'
import { IpEventLogsFilters } from './IpEventLogsFilters'
import type { IpEventLogsToolbarProps } from './IpEventLogsToolbarProps'
import { IpSectionSearchInput } from './IpSectionSearchInput'
import { IpSectionSelect } from './IpSectionSelect'

/** Search, filter and sort controls of the IP event timeline. */
export function IpEventLogsToolbar({
  query,
  onChange,
}: Readonly<IpEventLogsToolbarProps>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IpSectionSearchInput
        value={query.search}
        label="Search events"
        placeholder="Search domain or report ID..."
        onSearch={(search) => {
          onChange({ ...query, search })
        }}
      />
      <IpEventLogsFilters query={query} onChange={onChange} />
      <IpSectionSelect
        label="Sort events"
        value={query.sort}
        options={ipLogsSortOptions}
        onChange={(sort) => {
          onChange({ ...query, sort: sort as IpLogsSort })
        }}
      />
    </div>
  )
}
