export type UseSndsConnectFlowReturn = {
  readonly authorizeUrl: string | null
  readonly redirectUrl: string
  readonly setRedirectUrl: (value: string) => void
  readonly handleConnect: () => void
  readonly handleSubmitRedirect: () => void
}
