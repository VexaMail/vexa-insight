export type IngestionSectionProps = {
  intervalMinutes: number
  daysBack: number
  onIntervalChange: (value: number) => void
  onDaysBackChange: (value: number) => void
}
