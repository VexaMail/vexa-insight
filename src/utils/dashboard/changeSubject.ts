import { pluralize } from './pluralize'

/** The one name a change is about, or how many there are. */
export function changeSubject(names: readonly string[], noun: string): string {
  const [first] = names
  return names.length === 1 && first ? first : pluralize(names.length, noun)
}
