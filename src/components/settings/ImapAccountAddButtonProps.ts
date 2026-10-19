export type ImapAccountAddButtonProps = {
  readonly onClick: () => void
  /** Words the button "Add another account" once one exists. */
  readonly hasAccounts: boolean
}
