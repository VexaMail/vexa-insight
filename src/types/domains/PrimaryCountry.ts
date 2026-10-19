/** The country that sent the most of a domain's mail, by message volume. */
export type PrimaryCountry = {
  readonly code: string
  readonly name: string
  /** Share of all messages from sources located there, 0-100. */
  readonly share: number
}
