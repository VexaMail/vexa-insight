import { dataWrapper } from './dataWrapper'
import { errorResponse } from './errorResponse'

/** Admin endpoints that start ingestion runs and drive self-update. */
export const adminJobPaths = {
  '/api/v1/admin/trigger-poll': {
    post: {
      summary: 'Trigger an ingest job',
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                fullRescan: {
                  type: 'boolean',
                  description:
                    'Ignore the configured ingestion window and scan the whole mailbox. Already-processed messages are still skipped.',
                },
              },
            },
          },
        },
      },
      responses: {
        '202': {
          description: 'Job started',
          content: {
            'application/json': {
              schema: dataWrapper({
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                },
              }),
            },
          },
        },
        '401': errorResponse,
        '409': errorResponse,
        '429': errorResponse,
      },
    },
  },
  '/api/v1/admin/update-check': {
    get: {
      summary: 'Read cached update status',
      responses: { '200': { description: 'OK' }, '401': errorResponse },
    },
    post: {
      summary: 'Force a refresh against GitHub',
      responses: {
        '200': { description: 'OK' },
        '401': errorResponse,
        '502': errorResponse,
      },
    },
  },
  '/api/v1/admin/apply-update': {
    get: {
      summary: 'Read self-update status',
      responses: { '200': { description: 'OK' }, '401': errorResponse },
    },
    post: {
      summary: 'Trigger a self-update (source installs with supervisor)',
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ref: {
                  type: 'string',
                  pattern: '^v\\d+\\.\\d+\\.\\d+(-[A-Za-z0-9.-]+)?$',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': { description: 'Update started' },
        '400': errorResponse,
        '401': errorResponse,
        '409': errorResponse,
      },
    },
  },
}
