'use client'

import { diagnosticsSectionDomId } from '@/utils/diagnostics'
import type { CollapsibleSectionProps } from './CollapsibleSectionProps'
import { CollapsibleSectionToggle } from './CollapsibleSectionToggle'
import { SectionHeader } from './SectionHeader'

/**
 * A diagnostics detail section whose body is collapsed until opened. The body
 * stays in the DOM so the print stylesheet can show every section in the PDF
 * export regardless of what is expanded on screen.
 */
export function CollapsibleSection({
  id,
  title,
  found,
  icon,
  helpText,
  open,
  onToggle,
  children,
}: Readonly<CollapsibleSectionProps>) {
  const domId = diagnosticsSectionDomId(id)
  const bodyId = `${domId}-body`

  return (
    <section
      id={domId}
      tabIndex={-1}
      className="bg-card flex scroll-mt-6 flex-col gap-5 rounded-xl border p-5 shadow-sm outline-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeader
          title={title}
          found={found}
          icon={icon}
          helpText={helpText}
        />
        <CollapsibleSectionToggle
          bodyId={bodyId}
          open={open}
          onToggle={onToggle}
        />
      </div>
      <div
        id={bodyId}
        className={
          open
            ? 'flex flex-col gap-5'
            : 'hidden print:flex print:flex-col print:gap-5'
        }
      >
        {children}
      </div>
    </section>
  )
}
