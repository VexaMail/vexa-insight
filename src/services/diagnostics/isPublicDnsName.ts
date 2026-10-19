import { INTERNAL_DNS_SUFFIXES } from '@/constants/diagnostics'
import { isIP } from 'node:net'

/**
 * Whether a name could be a public DNS name: two or more valid labels, not an
 * IP literal, a non-numeric top-level label, and outside the private and
 * special-use zones.
 */
export function isPublicDnsName(name: string): boolean {
  const normalized = name.toLowerCase().replace(/\.$/, '')
  if (isIP(normalized) !== 0 || normalized.length > 253) return false
  const labels = normalized.split('.')
  if (labels.length < 2) return false
  const validLabels = labels.every((label) =>
    /^[a-z0-9_](?:[a-z0-9_-]{0,61}[a-z0-9_])?$/.test(label),
  )
  if (!validLabels || /^\d+$/.test(labels.at(-1) ?? '')) return false
  return !INTERNAL_DNS_SUFFIXES.some((suffix) =>
    `.${normalized}`.endsWith(suffix),
  )
}
