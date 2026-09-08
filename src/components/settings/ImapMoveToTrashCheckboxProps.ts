export type ImapMoveToTrashCheckboxProps = {
  checked: boolean
  index: number
  moveToFolder: boolean
  onChange: (index: number, checked: boolean) => void
}
