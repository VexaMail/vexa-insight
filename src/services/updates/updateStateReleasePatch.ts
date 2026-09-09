import type { UpdateStateColumns } from './UpdateStateColumns'
import type { UpsertUpdateStateInput } from './UpsertUpdateStateInput'

/**
 * The latest-release columns the input names.
 */
export function updateStateReleasePatch(
  input: UpsertUpdateStateInput,
): UpdateStateColumns {
  const patch: UpdateStateColumns = {}
  if (input.currentVersion !== undefined)
    patch.currentVersion = input.currentVersion
  if (input.latestVersion !== undefined)
    patch.latestVersion = input.latestVersion
  if (input.latestUrl !== undefined) patch.latestUrl = input.latestUrl
  if (input.latestPublishedAt !== undefined)
    patch.latestPublishedAt = input.latestPublishedAt
  if (input.latestNotes !== undefined) patch.latestNotes = input.latestNotes
  return patch
}
