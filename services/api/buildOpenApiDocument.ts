import { APP_VERSION } from '@/constants/app'

export function buildOpenApiDocument(): Record<string, unknown> {
  const errorSchema = {
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

  const dataWrapper = (schema: Record<string, unknown>) => ({
    type: 'object',
    required: ['data'],
    properties: { data: schema },
  })

  const webhookEndpointSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      enabled: { type: 'boolean' },
      events: { type: 'array', items: { type: 'string' } },
      secret: { type: 'string', nullable: true },
      lastDispatchAt: { type: 'string', format: 'date-time', nullable: true },
      lastStatus: { type: 'string', nullable: true },
      lastError: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  }

  const webhookInputSchema = {
    type: 'object',
    required: ['name', 'url', 'events'],
    properties: {
      name: { type: 'string', maxLength: 120 },
      url: { type: 'string', format: 'uri', maxLength: 2048 },
      enabled: { type: 'boolean', default: true },
      events: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          enum: [
            'ingest.failed',
            'unauthorized_source.detected',
            'update.available',
            'auth.fail_rate_spike',
            'test.ping',
          ],
        },
      },
      secret: { type: 'string', minLength: 16, maxLength: 256, nullable: true },
    },
  }

  const errorResponse = {
    description: 'Error',
    content: { 'application/json': { schema: errorSchema } },
  }

  return {
    openapi: '3.1.0',
    info: {
      title: 'Vexa Mail Insight API',
      description:
        'Stable HTTP API for the Vexa Mail Insight self-hosted DMARC observability platform.',
      version: APP_VERSION,
      license: {
        name: 'Apache-2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0',
      },
    },
    servers: [{ url: '/', description: 'This installation' }],
    components: {
      securitySchemes: {
        ApiKeyHeader: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
        BearerAuth: { type: 'http', scheme: 'bearer' },
        SessionCookie: { type: 'apiKey', in: 'cookie', name: 'session' },
      },
      schemas: {
        Error: errorSchema,
        WebhookEndpoint: webhookEndpointSchema,
        WebhookEndpointInput: webhookInputSchema,
      },
    },
    security: [{ ApiKeyHeader: [] }, { BearerAuth: [] }, { SessionCookie: [] }],
    paths: {
      '/api/v1/health': {
        get: {
          summary: 'Health check',
          description:
            'Returns 200 if the database is reachable, 503 otherwise. Used by Docker HEALTHCHECK.',
          security: [],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: dataWrapper({
                    type: 'object',
                    properties: { status: { type: 'string', example: 'ok' } },
                  }),
                },
              },
            },
            '503': errorResponse,
          },
        },
      },
      '/api/v1/metrics': {
        get: {
          summary: 'Prometheus metrics',
          description:
            'Returns Prometheus text-format metrics for ingestion volume, auth results, and job state.',
          responses: {
            '200': {
              description: 'Prometheus exposition format',
              content: {
                'text/plain': {
                  schema: { type: 'string' },
                  example:
                    '# HELP vexa_dmarc_reports_total Number of DMARC reports ingested.\n# TYPE vexa_dmarc_reports_total counter\nvexa_dmarc_reports_total 1234\n',
                },
              },
            },
            '401': errorResponse,
          },
        },
      },
      '/api/v1/admin/trigger-poll': {
        post: {
          summary: 'Trigger an ingest job',
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
    },
  }
}
