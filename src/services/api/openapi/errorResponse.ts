import { errorSchema } from './errorSchema'

/** The shared response object for every documented error status. */
export const errorResponse = {
  description: 'Error',
  content: { 'application/json': { schema: errorSchema } },
}
