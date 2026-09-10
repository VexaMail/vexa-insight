'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSummaryData } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { authStatusColumn } from './columns/authStatusColumn'
import { countryColumn } from './columns/countryColumn'
import { createActionsColumn } from './columns/createActionsColumn'
import { createHostnameColumn } from './columns/createHostnameColumn'
import { dkimRateColumn } from './columns/dkimRateColumn'
import { ipColumn } from './columns/ipColumn'
import { lastSeenColumn } from './columns/lastSeenColumn'
import { spfRateColumn } from './columns/spfRateColumn'
import { volumeColumn } from './columns/volumeColumn'
import type { GetIpsColumnsParams } from './GetIpsColumnsParams'

export function getIpsColumns(
  params: GetIpsColumnsParams,
): ColumnDef<typeof dataTableFeatures, IpSummaryData>[] {
  return [
    countryColumn,
    ipColumn,
    createHostnameColumn(params),
    authStatusColumn,
    spfRateColumn,
    dkimRateColumn,
    lastSeenColumn,
    volumeColumn,
    createActionsColumn(params),
  ]
}
