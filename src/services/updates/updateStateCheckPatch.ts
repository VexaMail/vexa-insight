import type { UpdateStateColumns } from './UpdateStateColumns'
import type { UpsertUpdateStateInput } from './UpsertUpdateStateInput'

/**
 * The scheduling and last-check columns the input names.
 */
export function updateStateCheckPatch(
  input: UpsertUpdateStateInput,
): UpdateStateColumns {
  const patch: UpdateStateColumns = {}
  if (input.enabled !== undefined) patch.enabled = input.enabled
  if (input.channel !== undefined) patch.channel = input.channel
  if (input.lastCheckedAt !== undefined)
    patch.lastCheckedAt = input.lastCheckedAt
  if (input.lastErrorAt !== undefined) patch.lastErrorAt = input.lastErrorAt
  if (input.lastError !== undefined) patch.lastError = input.lastError
  return patch
}
