export const webhookInputSchema = {
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
