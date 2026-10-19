/** The SPF generator form; lists are separated by spaces or commas. */
export type SpfGeneratorFields = {
  readonly includes: string
  readonly ip4: string
  readonly ip6: string
  readonly a: boolean
  readonly mx: boolean
  readonly all: string
}
