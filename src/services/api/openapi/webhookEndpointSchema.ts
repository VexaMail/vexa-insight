export const webhookEndpointSchema = {
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
