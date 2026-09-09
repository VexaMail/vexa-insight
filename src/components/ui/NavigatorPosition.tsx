import type { NavigatorPositionProps } from '@/types/ui'

/** "Viewing N of M" with both numbers emphasised. */
export function NavigatorPosition({
  currentIndex,
  total,
}: Readonly<NavigatorPositionProps>) {
  return (
    <span className="text-zinc-600 dark:text-zinc-300">
      Viewing{' '}
      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
        {currentIndex + 1}
      </span>{' '}
      of{' '}
      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
        {total}
      </span>
    </span>
  )
}
