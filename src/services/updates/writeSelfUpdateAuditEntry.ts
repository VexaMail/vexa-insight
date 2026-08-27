import { SELF_UPDATE_AUDIT_PATH } from '@/constants/updates'
import type { SelfUpdateAuditEntry } from '@/types/updates'
import { log } from '@/utils/log'
import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export function writeSelfUpdateAuditEntry(entry: SelfUpdateAuditEntry): void {
  try {
    mkdirSync(dirname(SELF_UPDATE_AUDIT_PATH), { recursive: true })
    appendFileSync(SELF_UPDATE_AUDIT_PATH, JSON.stringify(entry) + '\n', 'utf8')
    log.info('self_update.audit_logged', { actor: entry.actor, ref: entry.ref })
  } catch (err) {
    log.error('self_update.audit_write_failed', {
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
