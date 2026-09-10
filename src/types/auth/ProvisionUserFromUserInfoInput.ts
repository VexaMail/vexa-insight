import type { OidcUserInfo } from './OidcUserInfo'

export type ProvisionUserFromUserInfoInput = {
  readonly info: OidcUserInfo
  readonly issuer: string
}
