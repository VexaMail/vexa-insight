export type IpHostnameToggleProps = {
  readonly id: string
  readonly label: string
  readonly checked: boolean
  readonly labelClassName: string
  readonly onToggle: (checked: boolean) => void
}
