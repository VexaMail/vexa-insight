export type DerivePasswordForWriteInput = {
  readonly hasNewPassword: boolean
  readonly newPassword: string | undefined
  readonly existingPassword: string | undefined
  readonly secretKey: string
}
