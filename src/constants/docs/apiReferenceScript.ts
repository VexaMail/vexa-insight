/**
 * The API reference viewer, pinned to one release with its subresource
 * integrity hash: an unpinned CDN URL would run whatever is published next.
 * To upgrade, change the version and recompute the hash of the exact file:
 * `curl -s <src> | openssl dgst -sha384 -binary | openssl base64 -A`.
 */
export const API_REFERENCE_SCRIPT = {
  src: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.72.3/dist/browser/standalone.min.js',
  integrity:
    'sha384-6RhLj1l05EqMawSBl5p1q8G6GPR+u0CzrZlK4Ma3uL4K08gI5ywJEQGiO5pZIagJ',
} as const
