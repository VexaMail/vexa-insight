import type { UserDomainMode } from './UserDomainMode'

export type UserFormInput = {
  readonly username: string
  readonly password: string
  readonly role: string
  readonly domainMode: UserDomainMode
  readonly domainsInput: string
  readonly isEdit: boolean
}
