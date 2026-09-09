import type { AggregateStats } from '@/types/reports'
import { FileText, Globe, Mail, ShieldCheck } from 'lucide-react'
import type { KpiCardDefinition } from './KpiCardDefinition'

/** The four headline figures; a dash stands in until the stats arrive. */
export function buildKpiCards(
  overall: AggregateStats | null,
): KpiCardDefinition[] {
  return [
    {
      title: 'Total Domains',
      value: overall ? overall.totalDomains.toLocaleString() : '—',
      icon: Globe,
    },
    {
      title: 'Total Reports',
      value: overall ? overall.totalReports.toLocaleString() : '—',
      icon: FileText,
    },
    {
      title: 'Total Emails',
      value: overall ? overall.totalEmails.toLocaleString() : '—',
      icon: Mail,
    },
    {
      title: 'Compliance',
      value: overall ? `${overall.overallPassRate.toFixed(1)}%` : '—',
      icon: ShieldCheck,
    },
  ]
}
