/**
 * Extracts the filename from a body-structure node's parameters
 * and disposition parameters.
 */
export function extractFilenameFromNode(
  node: Record<string, unknown>,
): string | null {
  const params = node['parameters']
  const dispositionParameters = node['dispositionParameters']
  let filename: unknown
  let parameterName: unknown
  let dispositionFilename: unknown
  let dispositionName: unknown
  if (typeof params === 'object' && params !== null) {
    if ('filename' in params) filename = params.filename
    if ('name' in params) parameterName = params.name
  }
  if (
    typeof dispositionParameters === 'object' &&
    dispositionParameters !== null
  ) {
    if ('filename' in dispositionParameters) {
      dispositionFilename = dispositionParameters.filename
    }
    if ('name' in dispositionParameters) {
      dispositionName = dispositionParameters.name
    }
  }
  const name =
    filename ?? parameterName ?? dispositionFilename ?? dispositionName
  return typeof name === 'string' ? name : null
}
