export type PollProgressPaginationProps = {
  readonly page: number
  readonly maxPage: number
  readonly canPrevious: boolean
  readonly canNext: boolean
  readonly onPageChange: (page: number) => void
}
