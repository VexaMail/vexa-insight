import {
  SOURCE_KIND_LABELS,
  SOURCE_KIND_READINGS,
  SOURCE_KIND_TONES,
} from '@/constants/domains'
import {
  STATUS_TONE_DOT_CLASSES,
  STATUS_TONE_TEXT_CLASSES,
} from '@/constants/ui'
import { cn } from '@/lib/utils'
import { formatSenderCategory } from '@/utils/format'
import type { ClassificationCellProps } from './ClassificationCellProps'

/** The source's reading (dot) and its sender identity or class (label). */
export function ClassificationCell({ row }: Readonly<ClassificationCellProps>) {
  const tone = SOURCE_KIND_TONES[row.kind]
  const sender = row.sender
  const identity = sender
    ? ` ${sender.name}, ${formatSenderCategory(sender.category)}, matched on ${sender.matchedOn === 'hostname' ? 'reverse DNS' : 'DKIM domain'}.`
    : ''
  return (
    <span
      className="flex max-w-[12rem] min-w-0 items-center gap-2"
      title={`${SOURCE_KIND_READINGS[row.kind]}${identity}`}
    >
      <span
        aria-hidden
        className={cn(
          'h-2 w-2 shrink-0 rounded-full',
          STATUS_TONE_DOT_CLASSES[tone],
        )}
      />
      <span className={cn('truncate text-sm', STATUS_TONE_TEXT_CLASSES[tone])}>
        {sender?.name ?? SOURCE_KIND_LABELS[row.kind]}
      </span>
    </span>
  )
}
