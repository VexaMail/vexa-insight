'use client'

import { useDiagnosticsSections } from '@/hooks/diagnostics'
import { DkimDetailSection } from '../dkim/DkimDetailSection'
import { DmarcDetailSection } from '../dmarc/DmarcDetailSection'
import { SpfDetailSection } from '../spf/SpfDetailSection'
import { SpfLookupTreeSection } from '../spf/SpfLookupTreeSection'
import type { DiagnosticsDnsTabProps } from './DiagnosticsDnsTabProps'

/** What decides DMARC for outgoing mail: the policy, SPF and DKIM. */
export function AuthTab({ dns }: Readonly<DiagnosticsDnsTabProps>) {
  const { getSectionProps } = useDiagnosticsSections()
  return (
    <>
      <DmarcDetailSection dns={dns} {...getSectionProps('dmarc')} />
      <SpfDetailSection dns={dns} {...getSectionProps('spf')} />
      <SpfLookupTreeSection dns={dns} {...getSectionProps('spf-tree')} />
      <DkimDetailSection dns={dns} {...getSectionProps('dkim')} />
    </>
  )
}
