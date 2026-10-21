import type { SubmitEvent } from 'react'

export type PublicCheckFormProps = {
  pending: boolean
  submit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>
}
