import type { TlsFailureDetail } from '@/types/tlsrpt'
import { isJsonRecord } from './isJsonRecord'
import { readJsonCount } from './readJsonCount'
import { readJsonString } from './readJsonString'

/** Reads one `failure-details[]` entry; null when it is not an object. */
export function readTlsFailureDetail(value: unknown): TlsFailureDetail | null {
  if (!isJsonRecord(value)) return null
  return {
    resultType: readJsonString(value, 'result-type') ?? 'unknown',
    sendingMtaIp: readJsonString(value, 'sending-mta-ip'),
    receivingMxHostname: readJsonString(value, 'receiving-mx-hostname'),
    receivingIp: readJsonString(value, 'receiving-ip'),
    failedSessionCount: readJsonCount(value, 'failed-session-count'),
    failureReasonCode: readJsonString(value, 'failure-reason-code'),
  }
}
