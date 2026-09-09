export type PageSizeSelectProps = {
  readonly pageSize: number
  readonly options: (number | 'all')[]
  readonly onChange: (size: number) => void
}
