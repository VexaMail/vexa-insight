import type { ProtocolStatusRowProps } from './ProtocolStatusRowProps'

export type ProtocolStatuses = Record<
  'spf' | 'dkim' | 'dmarc' | 'bimi' | 'mtaSts' | 'tlsRpt',
  ProtocolStatusRowProps['status']
>
