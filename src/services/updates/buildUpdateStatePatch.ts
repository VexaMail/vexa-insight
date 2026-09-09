import { updateStateCheckPatch } from './updateStateCheckPatch'
import type { UpdateStatePatch } from './UpdateStatePatch'
import { updateStateReleasePatch } from './updateStateReleasePatch'
import type { UpsertUpdateStateInput } from './UpsertUpdateStateInput'

/**
 * Only the keys present in the input are written; missing keys are preserved.
 */
export function buildUpdateStatePatch(
  input: UpsertUpdateStateInput,
  now: Date,
): UpdateStatePatch {
  return {
    updatedAt: now,
    ...updateStateCheckPatch(input),
    ...updateStateReleasePatch(input),
  }
}
