export type SpfRecordOptions = {
  readonly includes: readonly string[]
  readonly ip4: readonly string[]
  readonly ip6: readonly string[]
  readonly mx: boolean
  readonly a: boolean
  /** `-all` fails unlisted senders, `~all` soft-fails them. */
  readonly all: 'fail' | 'softfail'
}
