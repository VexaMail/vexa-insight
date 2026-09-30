import { readAuthResult } from './readAuthResult'

/** The SPF, DKIM and DMARC results of an Authentication-Results value. */
export function readAuthResults(authResults: string | null): {
  spfResult: string | null
  dkimResult: string | null
  dmarcResult: string | null
} {
  return {
    spfResult: readAuthResult(authResults, 'spf'),
    dkimResult: readAuthResult(authResults, 'dkim'),
    dmarcResult: readAuthResult(authResults, 'dmarc'),
  }
}
