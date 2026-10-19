/** One reason DMARC-failing mail failed, with how many messages show it. */
export type FailureReason = {
  readonly key: 'spf-auth' | 'spf-unaligned' | 'dkim-none' | 'dkim-unaligned'
  readonly label: string
  readonly messages: number
}
