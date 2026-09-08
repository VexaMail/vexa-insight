import { APP_VERSION } from '@/constants/app'
import { adminJobPaths } from './openapi/adminJobPaths'
import { errorSchema } from './openapi/errorSchema'
import { observabilityPaths } from './openapi/observabilityPaths'
import { webhookEndpointSchema } from './openapi/webhookEndpointSchema'
import { webhookInputSchema } from './openapi/webhookInputSchema'
import { webhookPaths } from './openapi/webhookPaths'

/** Assembles the OpenAPI 3.1 document served at `/api/v1/openapi.json`. */
export function buildOpenApiDocument(): Record<string, unknown> {
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
      ...observabilityPaths,
      ...adminJobPaths,
      ...webhookPaths,
    },
  }
}
