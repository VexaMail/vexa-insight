import { REPORT_SOURCE_COLUMNS } from '@/constants/reports'

/** Column headers of the sending-sources table. */
export function ReportSourcesTableHeader() {
  return (
    <thead>
      <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
        {REPORT_SOURCE_COLUMNS.map((column) => (
          <th
            key={column.label}
            className={`px-3 py-2 font-medium text-zinc-500 dark:text-zinc-400 text-${column.align}`}
          >
            {column.srOnly ? (
              <span className="sr-only">{column.label}</span>
            ) : (
              column.label
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}
