import type { DiagnosticsWhyItem } from '@/types/diagnostics'
import { ChartColumn, Mail, ShieldCheck } from 'lucide-react'

export const whyDiagnosticsMatter: readonly DiagnosticsWhyItem[] = [
  {
    icon: Mail,
    title: 'Stops direct spoofing',
    text: 'At p=quarantine or p=reject, receivers act on mail that fails DMARC instead of only reporting it.',
  },
  {
    icon: ChartColumn,
    title: 'Keeps legitimate mail delivered',
    text: 'Senders passing SPF or DKIM aligned with your domain keep passing DMARC when the policy tightens.',
  },
  {
    icon: ShieldCheck,
    title: 'Protects inbound transport',
    text: 'MTA-STS makes sending servers require TLS to your MX hosts; TLS-RPT reports when that fails.',
  },
]
