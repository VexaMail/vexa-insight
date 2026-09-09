import type { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import type { UserDomainMode } from './UserDomainMode'

export type UseUserModalReturn = {
  readonly username: string
  readonly setUsername: Dispatch<SetStateAction<string>>
  readonly password: string
  readonly setPassword: Dispatch<SetStateAction<string>>
  readonly role: string
  readonly setRole: Dispatch<SetStateAction<string>>
  readonly domainMode: UserDomainMode
  readonly setDomainMode: Dispatch<SetStateAction<UserDomainMode>>
  readonly domainsInput: string
  readonly setDomainsInput: Dispatch<SetStateAction<string>>
  readonly error: string
  readonly handleSubmit: (e: SyntheticEvent) => Promise<void>
}
