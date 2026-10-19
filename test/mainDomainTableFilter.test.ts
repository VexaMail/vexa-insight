// @vitest-environment jsdom

import { useDataTable } from '@/hooks/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSourceRow } from '@/types/ips'
import { mainDomainFilterFn } from '@/utils/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

describe('main-domain table filtering', () => {
  const data: IpSourceRow[] = [
    'example.com',
    'mail.example.com',
    'notexample.com',
    null,
  ].map((hostname) => ({
    ip: '203.0.113.10',
    countryCode: null,
    hostname,
    hostnameLastLookupAt: null,
    totalMessages: 0,
    emailsSentCount: 0,
    firstSeen: null,
    lastSeen: null,
    spfPassCount: 0,
    dkimPassCount: 0,
    fullyAlignedCount: 0,
    spfAuthPassCount: 0,
    spfUnalignedPassCount: 0,
    dkimAuthPassCount: 0,
    dkimUnalignedPassCount: 0,
    dmarcPassCount: 0,
    spfAuthPassRate: 0,
    dkimAuthPassRate: 0,
    dmarcPassRate: 0,
    spfPassRate: 0,
    dkimPassRate: 0,
    fullyAlignedRate: 0,
    dispositionNone: 0,
    dispositionQuarantine: 0,
    dispositionReject: 0,
    sender: null,
    cause: 'unknown' as const,
  }))
  const columns: ColumnDef<typeof dataTableFeatures, IpSourceRow>[] = [
    { accessorKey: 'hostname', filterFn: mainDomainFilterFn },
  ]

  afterEach(cleanup)

  it('matches the exact domain and subdomains while excluding suffix lookalikes', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }))

    act(() =>
      result.current.table.getColumn('hostname')?.setFilterValue('example.com'),
    )
    expect(
      result.current.table
        .getRowModel()
        .rows.map((row) => row.original.hostname),
    ).toEqual(['example.com', 'mail.example.com'])
  })

  it('restores every row, including missing hostnames, for All or empty filters', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }))

    act(() => result.current.table.getColumn('hostname')?.setFilterValue('All'))
    expect(result.current.table.getRowModel().rows).toHaveLength(4)

    act(() => result.current.table.getColumn('hostname')?.setFilterValue(''))
    expect(result.current.table.getRowModel().rows).toHaveLength(4)
  })
})
