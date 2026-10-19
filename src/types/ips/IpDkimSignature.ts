/** One DKIM signer seen on a source's mail, with its result and volume. */
export type IpDkimSignature = {
  readonly domain: string
  readonly selector: string
  readonly result: string
  readonly isAligned: boolean
  readonly messages: number
}
