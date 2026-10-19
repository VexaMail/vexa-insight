/** One step of a finding's correction flow, from the run's own data. */
export type FindingStep = {
  readonly key: 'observed' | 'expected' | 'fix' | 'verify'
  readonly label: string
  readonly text: string
  /** A record or command to read in mono, when the run gives one. */
  readonly code: string | null
}
