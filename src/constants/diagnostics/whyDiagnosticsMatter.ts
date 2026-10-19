import type { DiagnosticsWhyItem } from '@/types/diagnostics'
import { ChartColumn, Lock, ShieldCheck } from 'lucide-react'

export const whyDiagnosticsMatter: readonly DiagnosticsWhyItem[] = [
  {
    icon: ShieldCheck,
    tone: 'success',
    title: 'Stops direct spoofing',
    text: 'At p=quarantine or p=reject, receivers act on mail that fails DMARC instead of only reporting it.',
  },
  {
    icon: ChartColumn,
    tone: 'info',
    title: 'Keeps legitimate mail delivered',
    text: 'Senders passing SPF or DKIM aligned with your domain keep passing DMARC when the policy tightens.',
  },
  {
    icon: Lock,
    tone: 'neutral',
    title: 'Protects inbound transport',
    text: 'MTA-STS makes sending servers require TLS to your MX hosts; TLS-RPT reports when that fails.',
  },
]
