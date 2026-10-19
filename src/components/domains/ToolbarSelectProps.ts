export type ToolbarSelectProps = {
  readonly label: string
  readonly value: string
  readonly options: readonly {
    readonly value: string
    readonly label: string
  }[]
  readonly onChange: (value: string) => void
}
