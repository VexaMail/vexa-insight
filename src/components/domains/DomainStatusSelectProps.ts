import type { ChangeEvent } from 'react'

export type DomainStatusSelectProps = {
  readonly value: string
  readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}
