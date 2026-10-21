export type PublicDmarcPolicy = {
  valid: boolean
  policy: string | null
  percentage: number
  issues: string[]
}
