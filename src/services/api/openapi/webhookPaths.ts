import { dataWrapper } from './dataWrapper'
import { errorResponse } from './errorResponse'
import { webhookEndpointSchema } from './webhookEndpointSchema'
import { webhookInputSchema } from './webhookInputSchema'

/** Admin CRUD for webhook endpoints, plus the test-ping dispatch. */
export const webhookPaths = {
  '/api/v1/admin/webhooks': {
    get: {
      summary: 'List webhook endpoints',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: dataWrapper({
                type: 'array',
                items: webhookEndpointSchema,
              }),
            },
          },
        },
        '401': errorResponse,
      },
    },
    post: {
      summary: 'Create webhook endpoint',
      requestBody: {
        required: true,
        content: {
          'application/json': { schema: webhookInputSchema },
        },
      },
      responses: {
        '201': {
          description: 'Created',
          content: {
            'application/json': {
              schema: dataWrapper(webhookEndpointSchema),
            },
          },
        },
        '400': errorResponse,
        '401': errorResponse,
      },
    },
  },
  '/api/v1/admin/webhooks/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
      },
    ],
    patch: {
      summary: 'Update webhook endpoint',
      requestBody: {
        required: true,
        content: {
          'application/json': { schema: webhookInputSchema },
        },
      },
      responses: {
        '200': { description: 'OK' },
        '400': errorResponse,
        '401': errorResponse,
      },
    },
    delete: {
      summary: 'Delete webhook endpoint',
      responses: {
        '200': { description: 'OK' },
        '400': errorResponse,
        '401': errorResponse,
      },
    },
    post: {
      summary: 'Dispatch a test ping to the endpoint',
      responses: {
        '200': { description: 'OK' },
        '400': errorResponse,
        '401': errorResponse,
      },
    },
  },
}
