/** Wraps a payload schema in the `{ data }` envelope route handlers return. */
export function dataWrapper(
  schema: Record<string, unknown>,
): Record<string, unknown> {
  return {
    type: 'object',
    required: ['data'],
    properties: { data: schema },
  }
}
