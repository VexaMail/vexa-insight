import { REPORT_SOURCE_COLUMNS } from '@/constants/reports'

/** Column headings of the report sources table. */
export function ReportSourcesTableHeader() {
  return (
    <thead className="bg-secondary/60 text-muted-foreground text-xs">
      <tr>
        {REPORT_SOURCE_COLUMNS.map((column) => (
          <th
            key={column.label}
            scope="col"
            className={
              column.align === 'right'
                ? 'px-4 py-2.5 text-right font-medium'
                : 'px-4 py-2.5 text-left font-medium'
            }
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}
