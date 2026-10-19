import type { AuthResultCellProps } from '@/types/reports'
import { authResultTone } from '@/utils/reports'
import { Check, X } from 'lucide-react'
import { ResultPill } from './ResultPill'

/** Authentication result, then whether it aligns: two facts, two lines. */
export function AuthResultCell({
  result,
  aligned,
  identity,
}: Readonly<AuthResultCellProps>) {
  return (
    <div className="flex flex-col items-start gap-1">
      <ResultPill tone={authResultTone(result)}>{result}</ResultPill>
      <span
        className={
          aligned
            ? 'text-success inline-flex items-center gap-1 text-xs'
            : 'text-muted-foreground inline-flex items-center gap-1 text-xs'
        }
      >
        {aligned ? (
          <Check className="h-3 w-3" aria-hidden="true" />
        ) : (
          <X className="h-3 w-3" aria-hidden="true" />
        )}
        {aligned ? 'Aligned' : 'Not aligned'}
      </span>
      {identity ? (
        <span
          className="text-muted-foreground max-w-40 truncate font-mono text-[11px]"
          title={`d=${identity}`}
        >
          d={identity}
        </span>
      ) : null}
    </div>
  )
}
