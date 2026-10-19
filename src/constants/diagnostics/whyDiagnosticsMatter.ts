import type { DiagnosticsWhyItem } from '@/types/diagnostics'

export const whyDiagnosticsMatter: readonly DiagnosticsWhyItem[] = [
  {
    title: 'Stops direct spoofing',
    text: 'At p=quarantine or p=reject, receivers act on mail that fails DMARC instead of only reporting it.',
  },
  {
    title: 'Keeps legitimate mail delivered',
    text: 'Senders passing SPF or DKIM aligned with your domain keep passing DMARC when the policy tightens.',
  },
  {
    title: 'Protects inbound transport',
    text: 'MTA-STS makes sending servers require TLS to your MX hosts; TLS-RPT reports when that fails.',
  },
]
