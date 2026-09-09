/**
 * Reads the `filename` and `name` entries of a MIME parameter bag, in that
 * precedence order; each is undefined when absent or when the bag is not an
 * object.
 */
export function readNameParameters(params: unknown): [unknown, unknown] {
  if (typeof params !== 'object' || params === null)
    return [undefined, undefined]
  const filename = 'filename' in params ? params.filename : undefined
  const name = 'name' in params ? params.name : undefined
  return [filename, name]
}
