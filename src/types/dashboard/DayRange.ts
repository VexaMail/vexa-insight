/** An inclusive range of UTC day indexes (`floor(unixSeconds / 86400)`). */
export type DayRange = {
  fromDay: number
  toDay: number
}
