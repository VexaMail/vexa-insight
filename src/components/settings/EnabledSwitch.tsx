import { cn } from '@/lib/utils'
import type { EnabledSwitchProps } from './EnabledSwitchProps'

/** An on/off switch for a row that saves the moment it is flipped. */
export function EnabledSwitch({
  checked,
  label,
  disabled = false,
  onChange,
}: Readonly<EnabledSwitchProps>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => {
        onChange(!checked)
      }}
      className={cn(
        'focus-visible:ring-ring relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50',
        checked ? 'bg-primary border-primary' : 'bg-muted border-border',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'bg-background h-4 w-4 rounded-full shadow transition-transform duration-150',
          checked ? 'translate-x-[19px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  )
}
