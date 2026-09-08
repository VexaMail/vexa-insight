export type ImapAccountRowToolbarProps = {
  accountId: number
  index: number
  onRemove: (index: number) => void
  onTestConnection: (accountId: number) => void
  removable: boolean
}
