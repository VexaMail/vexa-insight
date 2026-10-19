'use client'

import { useDiagnosticsSections } from '@/hooks/diagnostics'
import { DnsRecordsSection } from '../dns/DnsRecordsSection'
import type { DiagnosticsDnsTabProps } from './DiagnosticsDnsTabProps'

/** A, NS and MX records as resolved in this run. */
export function DnsTab({ dns }: Readonly<DiagnosticsDnsTabProps>) {
  const { getSectionProps } = useDiagnosticsSections()
  return <DnsRecordsSection dns={dns} {...getSectionProps('dns')} />
}
