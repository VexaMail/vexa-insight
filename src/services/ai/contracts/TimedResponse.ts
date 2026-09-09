/** A fetch response plus how long the round trip took. */
export type TimedResponse = {
  response: Response
  durationMs: number
}
