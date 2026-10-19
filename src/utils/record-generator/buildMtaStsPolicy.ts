import type { MtaStsPolicyOptions } from '@/types/record-generator'

/** The text served at `https://mta-sts.<domain>/.well-known/mta-sts.txt`. */
export function buildMtaStsPolicy(options: MtaStsPolicyOptions): string {
  const mx = options.mx
    .map((host) => host.trim().replace(/\.$/, ''))
    .filter((host) => host.length > 0)
  return [
    'version: STSv1',
    `mode: ${options.mode}`,
    ...mx.map((host) => `mx: ${host}`),
    `max_age: ${String(Math.min(31_557_600, Math.max(0, Math.round(options.maxAge))))}`,
  ].join('\n')
}
