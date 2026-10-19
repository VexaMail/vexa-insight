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
    <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:items-center">
      <div className="col-span-2 flex lg:min-w-[16rem] lg:flex-1">
        <IpSectionSearchInput
          value={query.search}
          label="Search events"
          placeholder="Search domain or report ID..."
          onSearch={(search) => {
            onChange({ ...query, search })
          }}
        />
      </div>
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
