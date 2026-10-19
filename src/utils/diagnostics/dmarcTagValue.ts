import type { DmarcTagInfo } from '@/types/diagnostics'

/**
 * The value of one tag of the published DMARC record (tags are listed as
 * `name=value`, defaults included), or an empty string.
 */
export function dmarcTagValue(
  tags: readonly DmarcTagInfo[],
  tag: string,
): string {
  return tags.find((info) => info.tag.startsWith(`${tag}=`))?.value.trim() ?? ''
}
