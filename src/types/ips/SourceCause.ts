/**
 * Why a sending source passes or fails DMARC, read from its stored results:
 * `dmarc-pass` passes, `forwarding` passes on DKIM while SPF fails (the
 * pattern of forwarded mail), `spf-unaligned` passes on DKIM while SPF passes
 * for another domain, `failing` fails both alignments, and `unknown` is mixed
 * or has no messages in the window.
 */
export type SourceCause =
  'dmarc-pass' | 'forwarding' | 'spf-unaligned' | 'failing' | 'unknown'
