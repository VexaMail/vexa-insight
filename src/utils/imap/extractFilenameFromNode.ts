import { readNameParameters } from './readNameParameters'

/**
 * Extracts the filename from a body-structure node's parameters
 * and disposition parameters.
 */
export function extractFilenameFromNode(
  node: Record<string, unknown>,
): string | null {
  const [filename, parameterName] = readNameParameters(node['parameters'])
  const [dispositionFilename, dispositionName] = readNameParameters(
    node['dispositionParameters'],
  )
  const name =
    filename ?? parameterName ?? dispositionFilename ?? dispositionName
  return typeof name === 'string' ? name : null
}
