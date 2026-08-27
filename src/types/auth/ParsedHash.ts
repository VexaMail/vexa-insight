export type ParsedHash = {
  salt: string
  hash: string
  opts: { N: number; r: number; p: number }
}
