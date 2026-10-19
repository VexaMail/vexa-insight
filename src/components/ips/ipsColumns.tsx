'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { causeColumn } from './columns/causeColumn'
import { countryColumn } from './columns/countryColumn'
import { createHostnameColumn } from './columns/createHostnameColumn'
import { createIpColumn } from './columns/createIpColumn'
import { dkimRateColumn } from './columns/dkimRateColumn'
import { lastSeenColumn } from './columns/lastSeenColumn'
import { phoneSummaryColumn } from './columns/phoneSummaryColumn'
import { senderColumn } from './columns/senderColumn'
import { spfRateColumn } from './columns/spfRateColumn'
import { volumeColumn } from './columns/volumeColumn'
import type { GetIpsColumnsParams } from './GetIpsColumnsParams'

/**
 * Columns of the sources table. The first one is the phone row summary; the
 * table wrapper shows only it below `md` and hides it from `md` up.
 */
export function getIpsColumns(
  params: GetIpsColumnsParams,
): ColumnDef<typeof dataTableFeatures, IpSourceRow>[] {
  return [
    phoneSummaryColumn,
    countryColumn,
    createIpColumn(params),
    createHostnameColumn(params),
    senderColumn,
    causeColumn,
    spfRateColumn,
    dkimRateColumn,
    lastSeenColumn,
    volumeColumn,
  ]
}
