'use client'

import { useCallback, useState } from 'react'

import type {
  DiagnosticsSectionId,
  DiagnosticsSectionToggleProps,
  UseDiagnosticsSectionsReturn,
} from '@/types/diagnostics'
import {
  scrollToDiagnosticsSection,
  toggleSectionId,
} from '@/utils/diagnostics'

/**
 * Tracks which diagnostics detail sections are expanded. Everything starts
 * collapsed; the overview rows open a section and scroll to it.
 */
export function useDiagnosticsSections(): UseDiagnosticsSectionsReturn {
  const [openIds, setOpenIds] = useState<ReadonlySet<DiagnosticsSectionId>>(
    () => new Set(),
  )

  const getSectionProps = useCallback(
    (id: DiagnosticsSectionId): DiagnosticsSectionToggleProps => ({
      open: openIds.has(id),
      onToggle: () => {
        setOpenIds((previous) => toggleSectionId(previous, id))
      },
    }),
    [openIds],
  )

  const openSection = useCallback((id: DiagnosticsSectionId) => {
    setOpenIds((previous) =>
      previous.has(id) ? previous : new Set(previous).add(id),
    )
    scrollToDiagnosticsSection(id)
  }, [])

  return { getSectionProps, openSection }
}
