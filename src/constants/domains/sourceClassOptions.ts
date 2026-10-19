import type { SourceClassOption } from '@/types/domains'

/** The classification filter of the sources table. */
export const SOURCE_CLASS_OPTIONS: readonly SourceClassOption[] = [
  { value: 'all', label: 'All sources' },
  { value: 'failing', label: 'Failing DMARC' },
  { value: 'legitimate', label: 'Legitimate, failing' },
  { value: 'forwarded', label: 'Forwarders / lists' },
  { value: 'unknown', label: 'Unknown, failing' },
]
