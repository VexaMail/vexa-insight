import {
  STATUS_TONE_CLASSES,
  STATUS_TONE_DOT_CLASSES,
  STATUS_TONE_SOLID_CLASSES,
} from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { StatusPillProps } from '@/types/ui'

/** A compact status label; the one badge shape every screen uses for state. */
export function StatusPill({
  tone,
  children,
  dot = false,
  icon,
  title,
  variant = 'soft',
  className,
}: Readonly<StatusPillProps>) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-xs font-medium whitespace-nowrap',
        variant === 'solid'
          ? STATUS_TONE_SOLID_CLASSES[tone]
          : STATUS_TONE_CLASSES[tone],
        variant === 'solid' && 'font-semibold',
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'solid'
              ? 'bg-current opacity-80'
              : STATUS_TONE_DOT_CLASSES[tone],
          )}
        />
      ) : null}
      {icon ? (
        <span aria-hidden className="[&_svg]:h-3.5 [&_svg]:w-3.5">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}
