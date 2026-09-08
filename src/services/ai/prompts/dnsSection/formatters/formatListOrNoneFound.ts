import { noneFoundLabel } from '../noneFoundLabel'

export function formatListOrNoneFound(values: readonly string[]): string {
  return values.length > 0 ? values.join(', ') : noneFoundLabel
}
