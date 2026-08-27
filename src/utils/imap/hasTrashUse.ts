import { TRASH_SPECIAL_USE } from './trashSpecialUse'

/**
 * Returns true if the mailbox has the \\Trash special-use attribute.
 */
export function hasTrashUse(m: { specialUse?: string | string[] }): boolean {
  const use = m.specialUse
  if (Array.isArray(use)) return use.includes(TRASH_SPECIAL_USE)
  return use === TRASH_SPECIAL_USE
}
