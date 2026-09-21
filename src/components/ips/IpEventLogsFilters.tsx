'use client'

import { ipAuthResultOptions, ipDispositionOptions } from '@/constants/ips'
import type { IpEventLogsFiltersProps } from './IpEventLogsFiltersProps'
import { IpSectionSelect } from './IpSectionSelect'

/** Disposition, SPF and DKIM dropdowns of the event timeline toolbar. */
export function IpEventLogsFilters({
  query,
  onChange,
}: Readonly<IpEventLogsFiltersProps>) {
  return (
    <>
      <IpSectionSelect
        label="Filter by disposition"
        value={query.disposition}
        options={ipDispositionOptions}
        allLabel="All actions"
        onChange={(disposition) => {
          onChange({ ...query, disposition })
        }}
      />
      <IpSectionSelect
        label="Filter by SPF result"
        value={query.spfResult}
        options={ipAuthResultOptions}
        allLabel="All SPF"
        onChange={(spfResult) => {
          onChange({ ...query, spfResult })
        }}
      />
      <IpSectionSelect
        label="Filter by DKIM result"
        value={query.dkimResult}
        options={ipAuthResultOptions}
        allLabel="All DKIM"
        onChange={(dkimResult) => {
          onChange({ ...query, dkimResult })
        }}
      />
    </>
  )
}
