// @vitest-environment jsdom

import { useDataTable } from '@/hooks/ui'
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

describe('useDataTable behavior', () => {
  const data = [
    { name: 'Sender 10', messages: 30, domain: 'example.com' },
    { name: 'Sender 2', messages: 10, domain: 'example.org' },
    { name: 'Sender 1', messages: 20, domain: 'example.com' },
  ]
  const columns = [
    { accessorKey: 'name' },
    { accessorKey: 'messages' },
    { accessorKey: 'domain' },
  ]

  afterEach(cleanup)

  it('applies initial numeric sorting before pagination', () => {
    const { result } = renderHook(() =>
      useDataTable({
        data,
        columns,
        initialSorting: [{ id: 'messages', desc: true }],
        defaultPageSize: 2,
      }),
    )

    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[0], data[2]])
  })

  it('updates controlled sorting through a column and preserves natural order', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }))

    act(() => result.current.table.getColumn('name')?.toggleSorting(false))
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[2], data[1], data[0]])

    act(() => result.current.table.getColumn('name')?.toggleSorting(true))
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[0], data[1], data[2]])
  })

  it('combines case-insensitive global search with column filtering', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }))

    act(() => result.current.table.getColumn('domain')?.setFilterValue('.com'))
    expect(result.current.table.getFilteredRowModel().rows).toHaveLength(2)

    act(() => {
      result.current.setGlobalFilter('SENDER 10')
    })
    expect(result.current.globalFilter).toBe('SENDER 10')
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[0]])

    act(() => {
      result.current.table.setGlobalFilter('absent')
    })
    expect(result.current.table.getRowModel().rows).toEqual([])

    act(() => {
      result.current.table.resetColumnFilters()
      result.current.setGlobalFilter('')
    })
    expect(result.current.table.getRowModel().rows).toHaveLength(3)
  })

  it('keeps numeric range column filtering available', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }))

    act(() =>
      result.current.table.getColumn('messages')?.setFilterValue([15, 25]),
    )
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[2]])
  })

  it('updates internal pagination and resets the page after filtering', async () => {
    const { result } = renderHook(() => {
      const value = useDataTable({ data, columns, defaultPageSize: 2 })
      value.table.getRowModel()
      return value
    })

    act(() => {
      result.current.table.nextPage()
    })
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[2]])

    act(() => {
      result.current.setGlobalFilter('Sender 10')
    })
    await waitFor(() => {
      expect(result.current.table.state.pagination.pageIndex).toBe(0)
    })
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual([data[0]])

    act(() => {
      result.current.table.setPageSize(1)
    })
    expect(result.current.table.state.pagination.pageSize).toBe(1)
  })

  it('defaults to ten rows and uses 10000 when pagination is hidden', () => {
    const rows = Array.from({ length: 12 }, (_, index) => ({
      name: `Row ${String(index)}`,
    }))
    const { result: paged } = renderHook(() =>
      useDataTable({ data: rows, columns: [{ accessorKey: 'name' }] }),
    )
    const { result: unpaged } = renderHook(() =>
      useDataTable({
        data: rows,
        columns: [{ accessorKey: 'name' }],
        defaultPageSize: 1,
        hidePagination: true,
      }),
    )

    expect(paged.current.table.state.pagination.pageSize).toBe(10)
    expect(paged.current.table.getRowModel().rows).toHaveLength(10)
    expect(unpaged.current.table.state.pagination.pageSize).toBe(10000)
    expect(unpaged.current.table.getRowModel().rows).toHaveLength(12)
  })

  it('retains the visibility and selection APIs used by the row renderer', () => {
    const { result } = renderHook(() => useDataTable({ data, columns }))

    expect(result.current.table.getRowModel().rows[0]?.getIsSelected()).toBe(
      false,
    )
    expect(
      result.current.table.getRowModel().rows[0]?.getVisibleCells(),
    ).toHaveLength(3)

    act(() => result.current.table.getColumn('domain')?.toggleVisibility(false))
    act(() => result.current.table.getRowModel().rows[0]?.toggleSelected(true))
    expect(
      result.current.table.getRowModel().rows[0]?.getVisibleCells(),
    ).toHaveLength(2)
    expect(result.current.table.getRowModel().rows[0]?.getIsSelected()).toBe(
      true,
    )
  })

  it('refreshes row models when caller data changes', () => {
    const { result, rerender } = renderHook(
      ({ rows }) => useDataTable({ data: rows, columns }),
      { initialProps: { rows: data } },
    )

    rerender({ rows: data.slice(1) })
    expect(
      result.current.table.getRowModel().rows.map((row) => row.original),
    ).toEqual(data.slice(1))
  })
})
