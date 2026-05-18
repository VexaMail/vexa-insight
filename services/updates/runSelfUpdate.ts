import { SELF_UPDATE_SCRIPT_PATH } from '@/constants/updates'
import { spawn } from 'node:child_process'
import { getBashPath } from './internals'

/**
 * Spawn the self-update script as a fully detached child so the Node
 * process is free to terminate (the script will SIGTERM us when ready)
 * and the supervisor can restart us against the new build.
 *
 * The bash binary is resolved to an absolute path (never via $PATH) and
 * the script path is a baked-in constant. The only caller-provided
 * argument is `ref`, which is whitelisted upstream against
 * SELF_UPDATE_REF_PATTERN.
 *
 * The script's stdio is redirected to its own log file; we ignore stdio
 * here so the child cannot be tied to the parent's streams.
 */
export function runSelfUpdate(ref: string | null): void {
  const args = ref ? [SELF_UPDATE_SCRIPT_PATH, ref] : [SELF_UPDATE_SCRIPT_PATH]
  const child = spawn(getBashPath(), args, {
    detached: true,
    stdio: 'ignore',
    env: {
      ...process.env,
      VEXA_PARENT_PID: String(process.pid),
    },
  })
  child.unref()
}
