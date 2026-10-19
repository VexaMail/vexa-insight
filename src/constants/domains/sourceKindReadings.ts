import type { FailingTrafficKind } from '@/types/enforcement'

/** Why a source got its classification, for the cell's tooltip. */
export const SOURCE_KIND_READINGS: Record<FailingTrafficKind, string> = {
  legitimate:
    'Legitimate: it mostly passes DMARC or is a recognised service, so its failures would be lost under enforcement.',
  forwarded:
    'Forwarder or mailing list: a mailbox provider or list relayed the mail, which breaks SPF.',
  unknown:
    'Unknown: unrecognised and mostly failing; enforcement would stop it.',
}
