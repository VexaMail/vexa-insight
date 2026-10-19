/** The DMARC generator form; address lists are comma separated. */
export type DmarcGeneratorFields = {
  readonly policy: string
  /** `inherit` when subdomains follow `policy`. */
  readonly subdomainPolicy: string
  readonly percent: string
  readonly rua: string
  readonly ruf: string
  readonly strictDkim: boolean
  readonly strictSpf: boolean
  readonly reportAnyFailure: boolean
}
