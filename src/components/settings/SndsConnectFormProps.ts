export type SndsConnectFormProps = {
  readonly authorizeUrl: string
  readonly redirectUrl: string
  readonly isBusy: boolean
  readonly onChange: (value: string) => void
  readonly onSubmit: () => void
}
