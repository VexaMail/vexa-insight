import type { DiagnosticsTabPanelProps } from './DiagnosticsTabPanelProps'

/** Shows the active tab; every panel stays in the DOM for the PDF export. */
export function DiagnosticsTabPanel({
  active,
  label,
  children,
}: Readonly<DiagnosticsTabPanelProps>) {
  return (
    <section
      aria-label={label}
      className={active ? 'space-y-4' : 'hidden space-y-4 print:block'}
    >
      {children}
    </section>
  )
}
