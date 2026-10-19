/** The MTA-STS generator form; MX hosts are separated by spaces or commas. */
export type MtaStsGeneratorFields = {
  readonly mode: string
  readonly mx: string
  readonly maxAge: string
  readonly id: string
}
