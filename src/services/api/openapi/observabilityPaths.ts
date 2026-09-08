import { dataWrapper } from './dataWrapper'
import { errorResponse } from './errorResponse'

/** Unauthenticated health probe and the Prometheus metrics endpoint. */
export const observabilityPaths = {
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
}
