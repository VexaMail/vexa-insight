export type IpHostnameTogglesProps = {
  readonly manualRefreshEnabled: boolean
  readonly allowPrivateIps: boolean
  readonly onChange: (key: string, value: boolean | number) => void
}
