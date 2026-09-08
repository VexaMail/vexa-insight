import type { DnsAdminGuideRule } from '@/types/diagnostics'

import { createDkimNotValidGuide } from './createDkimNotValidGuide'
import { createInvalidDmarcGuide } from './createInvalidDmarcGuide'
import { createInvalidSpfGuide } from './createInvalidSpfGuide'
import { createMissingBimiGuide } from './createMissingBimiGuide'
import { createMissingDmarcGuide } from './createMissingDmarcGuide'
import { createMissingMtaStsGuide } from './createMissingMtaStsGuide'
import { createMissingSpfGuide } from './createMissingSpfGuide'
import { createMissingTlsRptGuide } from './createMissingTlsRptGuide'
import { createMonitoringOnlyDmarcGuide } from './createMonitoringOnlyDmarcGuide'
import { createMtaStsPolicyUnreachableGuide } from './createMtaStsPolicyUnreachableGuide'
import { createSpfHardeningGuide } from './createSpfHardeningGuide'

/**
 * Evaluated in order, so the emitted guides keep the order the admin view
 * expects: SPF, DMARC, DKIM, BIMI, MTA-STS, TLS-RPT.
 */
export const dnsAdminGuideRules: readonly DnsAdminGuideRule[] = [
  { applies: (dns) => dns.spf === null, build: createMissingSpfGuide },
  {
    applies: (dns) => dns.spf !== null && !dns.spfValid,
    build: createInvalidSpfGuide,
  },
  {
    applies: (dns) =>
      dns.spf !== null && dns.spfValid && dns.spfWarning !== null,
    build: createSpfHardeningGuide,
  },
  { applies: (dns) => dns.dmarc === null, build: createMissingDmarcGuide },
  {
    applies: (dns) => dns.dmarc !== null && !dns.dmarcValid,
    build: createInvalidDmarcGuide,
  },
  {
    applies: (dns) => dns.dmarcPolicy === 'none',
    build: createMonitoringOnlyDmarcGuide,
  },
  {
    applies: (dns) => !dns.dkimParsedRecords.some((record) => record.valid),
    build: createDkimNotValidGuide,
  },
  { applies: (dns) => dns.bimi.raw === null, build: createMissingBimiGuide },
  {
    applies: (dns) => dns.mtaSts.raw === null,
    build: createMissingMtaStsGuide,
  },
  {
    applies: (dns) =>
      dns.mtaSts.raw !== null && !dns.mtaSts.policyFileAccessible,
    build: createMtaStsPolicyUnreachableGuide,
  },
  {
    applies: (dns) => dns.tlsRpt.raw === null,
    build: createMissingTlsRptGuide,
  },
]
