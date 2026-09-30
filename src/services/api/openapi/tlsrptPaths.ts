import { dataWrapper } from './dataWrapper'
import { errorResponse } from './errorResponse'

/** The unauthenticated HTTPS receiver for SMTP TLS reports (RFC 8460). */
export const tlsrptPaths = {
  '/api/v1/tlsrpt': {
    post: {
      summary: 'Receive an SMTP TLS report over HTTPS',
      description:
        'Target for `rua=https://<host>/api/v1/tlsrpt` in a `_smtp._tls` TXT record (RFC 8460 section 5.2). Unauthenticated by design; reports are kept only when a policy domain is already monitored by this instance, and each client address is limited to 60 reports an hour. A report already stored answers 200.',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/tlsrpt+json': { schema: { type: 'object' } },
          'application/tlsrpt+gzip': {
            schema: { type: 'string', format: 'binary' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Stored',
          content: {
            'application/json': {
              schema: dataWrapper({
                type: 'object',
                properties: { stored: { type: 'boolean' } },
              }),
            },
          },
        },
        '200': { description: 'Already stored' },
        '400': errorResponse,
        '403': errorResponse,
        '413': errorResponse,
        '415': errorResponse,
        '429': errorResponse,
      },
    },
  },
}
