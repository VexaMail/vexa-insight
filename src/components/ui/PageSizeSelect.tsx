import type { PageSizeSelectProps } from '@/types/ui'

/** Labelled page-size dropdown; "all" maps to a very large page. */
export function PageSizeSelect({
  pageSize,
  options,
  onChange,
}: Readonly<PageSizeSelectProps>) {
  return (
    <>
      <label htmlFor="unified-page-size" className="text-muted-foreground">
        Page size
      </label>
      <select
        id="unified-page-size"
        value={pageSize}
        onChange={(e) => {
          const v = Number(e.target.value)
          if (!Number.isNaN(v)) onChange(v)
        }}
        className="bg-card border-border/50 text-foreground h-7 rounded-md border px-2 text-xs"
        aria-label="Items per page"
      >
        {options.map((size) => {
          const val = size === 'all' ? 100000 : size
          const label = size === 'all' ? 'All' : String(size)
          return (
            <option key={size} value={val}>
              {label}
            </option>
          )
        })}
      </select>
    </>
  )
}
