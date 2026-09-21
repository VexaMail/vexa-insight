'use client'

import { ipDomainsSortOptions } from '@/constants/ips'
import type { IpDomainsSort } from '@/types/ips'
import type { IpRelatedDomainsToolbarProps } from './IpRelatedDomainsToolbarProps'
import { IpSectionSearchInput } from './IpSectionSearchInput'
import { IpSectionSelect } from './IpSectionSelect'

/** Search and sort controls of the related-domains section. */
export function IpRelatedDomainsToolbar({
  query,
  onChange,
}: Readonly<IpRelatedDomainsToolbarProps>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IpSectionSearchInput
        value={query.search}
        label="Search related domains"
        placeholder="Search domain..."
        onSearch={(search) => {
          onChange({ ...query, search })
        }}
      />
      <IpSectionSelect
        label="Sort related domains"
        value={query.sort}
        options={ipDomainsSortOptions}
        onChange={(sort) => {
          onChange({ ...query, sort: sort as IpDomainsSort })
        }}
      />
    </div>
  )
}
