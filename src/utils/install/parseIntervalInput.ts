import { DEFAULT_INTERVAL } from './defaultInterval'

/** The typed interval in minutes, or the default for anything unparsable. */
export function parseIntervalInput(value: string): number {
  return parseInt(value, 10) || DEFAULT_INTERVAL
}
