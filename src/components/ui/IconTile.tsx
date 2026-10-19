import { ICON_TILE_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IconTileProps } from '@/types/ui'

/** An icon in a tinted rounded square: the lead of a KPI or a list row. */
export function IconTile({
  children,
  tone = 'neutral',
  size = 'md',
  className,
}: Readonly<IconTileProps>) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg ring-1 ring-inset',
        size === 'md'
          ? 'h-11 w-11 [&_svg]:h-5 [&_svg]:w-5'
          : 'h-8 w-8 [&_svg]:h-4 [&_svg]:w-4',
        ICON_TILE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
