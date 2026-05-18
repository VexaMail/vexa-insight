import type { LogFields, LogLevel } from '@/types/log'
import { shouldJson } from './shouldJson'

export function emit(
  level: LogLevel,
  event: string,
  fields: LogFields = {},
): void {
  if (shouldJson()) {
    const entry = {
      ts: new Date().toISOString(),
      level,
      event,
      ...fields,
    }
    const line = JSON.stringify(entry)
    if (level === 'error') console.error(line)
    else if (level === 'warn') console.warn(line)
    else console.log(line)
    return
  }
  const tail = Object.keys(fields).length ? ' ' + JSON.stringify(fields) : ''
  const msg = `[${level}] ${event}${tail}`
  if (level === 'error') console.error(msg)
  else if (level === 'warn') console.warn(msg)
  else console.log(msg)
}
