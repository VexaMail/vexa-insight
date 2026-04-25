export type GeoIpProgressEvent = {
  /** Human-readable description of the current step */
  step: string
  /** Overall progress 0–100 */
  progress: number
  /** Estimated seconds remaining (optional) */
  eta?: number
}
