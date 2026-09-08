/** The `{ error: { code, message } }` body every failing endpoint returns. */
export const errorSchema = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'object',
      required: ['code', 'message'],
      properties: {
        code: { type: 'string', example: 'UNAUTHORIZED' },
        message: { type: 'string', example: 'Invalid or missing API key' },
      },
    },
  },
}
