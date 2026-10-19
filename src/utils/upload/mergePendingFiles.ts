/** Adds newly picked or dropped files to the pending list, skipping ones already in it. */
export function mergePendingFiles(
  pending: readonly File[],
  incoming: readonly File[],
): File[] {
  const merged = [...pending]
  for (const file of incoming) {
    const isListed = merged.some(
      (p) => p.name === file.name && p.size === file.size,
    )
    if (!isListed) merged.push(file)
  }
  return merged
}
