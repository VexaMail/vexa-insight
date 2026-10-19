import { cn } from '@/lib/utils'
import type { DkimCheckedSelectorsProps } from './DkimCheckedSelectorsProps'

/**
 * Every selector looked up in this run, so "none found" reads as "none among
 * these". Selectors taken from received reports are marked.
 */
export function DkimCheckedSelectors({
  records,
}: Readonly<DkimCheckedSelectorsProps>) {
  const reported = records.filter((record) => record.fromReports === true)
  return (
    <div className="space-y-2">
      <h4 className="text-foreground text-sm font-semibold">
        Selectors checked ({records.length})
      </h4>
      <p className="text-muted-foreground text-xs">
        {reported.length > 0
          ? `${String(reported.length)} come from DKIM signatures in received reports (marked *); the rest are common provider selectors.`
          : 'Common provider selectors. No signature of this domain in received reports named another one.'}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {records.map((record) => (
          <li
            key={record.selector}
            className={cn(
              'rounded border px-1.5 py-0.5 font-mono text-[11px]',
              record.valid
                ? 'border-success/30 bg-success/10 text-success'
                : 'border-border text-muted-foreground',
              record.record !== null &&
                !record.valid &&
                'border-danger/30 text-danger',
            )}
          >
            {record.selector}
            {record.fromReports === true ? '*' : ''}
            <span className="sr-only">
              {record.valid
                ? ': valid key'
                : record.record === null
                  ? ': no record'
                  : ': invalid record'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
