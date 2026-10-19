import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpRawResultProps } from '@/types/ip-detail'
import { resultTone } from '@/utils/ips'

/** A `name = result` pair of a raw record, the result coloured. */
export function IpRawResult({ label, result }: Readonly<IpRawResultProps>) {
  return (
    <span className="block whitespace-nowrap">
      <span className="text-foreground">{label}</span>{' '}
      <span
        className={cn(
          'font-semibold',
          STATUS_TONE_TEXT_CLASSES[resultTone(result)],
        )}
      >
        {result || 'none'}
      </span>
    </span>
  )
}
