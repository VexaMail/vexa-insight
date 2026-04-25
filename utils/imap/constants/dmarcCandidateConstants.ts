/**
 * Constants for DMARC candidate part detection (content-types, excluded types, filename hints).
 * Single export for one-export-per-file compliance.
 */
export const dmarcCandidateConstants = {
  contentTypes: new Set([
    'application/zip',
    'application/gzip',
    'application/x-gzip',
    'application/octet-stream',
    'text/xml',
    'application/xml',
  ]),
  excludedTypes: new Set(['message/rfc822', 'text/html']),
  filenameHints: ['dmarc', 'rua', 'report', 'aggregate', 'feedback'] as const,
  extensions: ['.xml', '.xml.gz', '.zip', '.gz', '.gzip'] as const,
} as const
