import type { ChangeEvent } from 'react'

export type PollProgressPageSizeControlProps = {
  readonly pageSize: number
  readonly total: number
  readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}
