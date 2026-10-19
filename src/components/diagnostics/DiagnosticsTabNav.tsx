'use client'

import { TabNav } from '@/components/ui'
import { useDiagnosticsActiveTab } from '@/hooks/diagnostics'
import { buildDiagnosticsTabItems } from '@/utils/diagnostics'
import type { DiagnosticsTabNavProps } from './DiagnosticsTabNavProps'

/** The page tabs, marking the tab in the address bar as it changes. */
export function DiagnosticsTabNav({ base }: Readonly<DiagnosticsTabNavProps>) {
  const active = useDiagnosticsActiveTab()
  return (
    <TabNav
      items={buildDiagnosticsTabItems(base)}
      active={active}
      label="Diagnostics sections"
    />
  )
}
