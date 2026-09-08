'use client'

import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { complianceColumn } from './columns/complianceColumn'
import { createActionsColumn } from './columns/createActionsColumn'
import { domainNameColumn } from './columns/domainNameColumn'
import { messagesColumn } from './columns/messagesColumn'
import { statusColumn } from './columns/statusColumn'
import type { GetDomainsColumnsParams } from './GetDomainsColumnsParams'

export function getDomainsColumns(
  params: GetDomainsColumnsParams,
): ColumnDef<DomainsTableRow>[] {
  return [
    domainNameColumn,
    messagesColumn,
    complianceColumn,
    statusColumn,
    createActionsColumn(params),
  ]
}
