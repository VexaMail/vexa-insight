/** Reported messages of one UTC report day (`floor(unixSeconds / 86400)`). */
export type DailyVolumeRow = {
  readonly day: number
  readonly total: number
}
