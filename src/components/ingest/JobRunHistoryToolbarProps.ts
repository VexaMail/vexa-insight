export type JobRunHistoryToolbarProps = {
  readonly selectedJobId: number | null
  readonly hideEmpty: boolean
  readonly onClearSelection: () => void
  readonly onToggleHideEmpty: (checked: boolean) => void
}
