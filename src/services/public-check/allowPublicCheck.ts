import { publicCheckState } from './publicCheckState'

export function allowPublicCheck(caller: string): boolean {
  const now = Date.now()
  if (now - publicCheckState.startedAt >= 60_000) {
    publicCheckState.startedAt = now
    publicCheckState.count = 0
  }
  if (publicCheckState.count >= 60) return false
  publicCheckState.count += 1
  const entry = publicCheckState.callers.get(caller)
  if (entry && now - entry.startedAt < 60_000) {
    entry.count += 1
    return entry.count <= 10
  }
  if (publicCheckState.callers.size >= 1000) publicCheckState.callers.clear()
  publicCheckState.callers.set(caller, { startedAt: now, count: 1 })
  return true
}
