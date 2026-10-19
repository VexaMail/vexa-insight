import type { SpfRecordOptions } from '@/types/record-generator'

/** An SPF TXT value: `a`/`mx` first, then addresses, includes and `all`. */
export function buildSpfRecord(options: SpfRecordOptions): string {
  const clean = (values: readonly string[]) =>
    values.map((value) => value.trim()).filter((value) => value.length > 0)
  return [
    'v=spf1',
    ...(options.a ? ['a'] : []),
    ...(options.mx ? ['mx'] : []),
    ...clean(options.ip4).map((ip) => `ip4:${ip}`),
    ...clean(options.ip6).map((ip) => `ip6:${ip}`),
    ...clean(options.includes).map((domain) => `include:${domain}`),
    options.all === 'fail' ? '-all' : '~all',
  ].join(' ')
}
