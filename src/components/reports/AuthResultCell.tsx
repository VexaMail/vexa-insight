import { StatusPill } from '@/components/ui'
import type { AuthResultCellProps } from '@/types/reports'
import { authResultTone } from '@/utils/reports'

/** Authentication result, then whether it aligns: two facts, two lines. */
export function AuthResultCell({
  result,
  aligned,
  identity,
}: Readonly<AuthResultCellProps>) {
  return (
    <div className="flex flex-col items-start gap-1">
      <StatusPill tone={authResultTone(result)}>{result}</StatusPill>
      <span
        className={
          aligned ? 'text-success text-xs' : 'text-muted-foreground text-xs'
        }
      >
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
