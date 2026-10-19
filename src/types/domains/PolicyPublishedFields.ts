import type { PublishedDmarcPolicy } from './PublishedDmarcPolicy'

/** The tags read out of a `policy_published` block. */
export type PolicyPublishedFields = Pick<
  PublishedDmarcPolicy,
  'policy' | 'subdomainPolicy' | 'pct' | 'adkim' | 'aspf'
>
