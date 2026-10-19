'use client'

import { useDiagnosticsSections } from '@/hooks/diagnostics'
import { BimiDetailSection } from '../bimi/BimiDetailSection'
import { MtaStsDetailSection } from '../mtasts/MtaStsDetailSection'
import { TlsRptDetailSection } from '../tlsrpt/TlsRptDetailSection'
import type { DiagnosticsDnsTabProps } from './DiagnosticsDnsTabProps'

/** Inbound transport security and reporting, kept apart from sender auth. */
export function TransportTab({ dns }: Readonly<DiagnosticsDnsTabProps>) {
  const { getSectionProps } = useDiagnosticsSections()
  return (
    <>
      <MtaStsDetailSection dns={dns} {...getSectionProps('mta-sts')} />
      <TlsRptDetailSection dns={dns} {...getSectionProps('tls-rpt')} />
      <BimiDetailSection dns={dns} {...getSectionProps('bimi')} />
    </>
  )
}
