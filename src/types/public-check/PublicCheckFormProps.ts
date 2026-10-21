import type { SubmitEvent } from 'react'

export type PublicCheckFormProps = {
  domain: string
  pending: boolean
  submit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>
}
