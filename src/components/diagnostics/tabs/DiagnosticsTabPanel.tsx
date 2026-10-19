import { cn } from '@/lib/utils'
import type { DiagnosticsTabPanelProps } from './DiagnosticsTabPanelProps'

/** Shows the active tab; printable panels stay in the DOM for the PDF. */
export function DiagnosticsTabPanel({
  active,
  label,
  printable = true,
  children,
}: Readonly<DiagnosticsTabPanelProps>) {
  const hidden = printable ? 'hidden space-y-4 print:block' : 'hidden'
  return (
    <section
      aria-label={label}
      className={cn(
        active ? 'space-y-4' : hidden,
        !printable && 'print:hidden',
      )}
    >
      {children}
    </section>
  )
}
