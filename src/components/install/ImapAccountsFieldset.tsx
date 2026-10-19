import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import { ImapAccountFields } from './ImapAccountFields'
import type { ImapAccountsFieldsetProps } from './ImapAccountsFieldsetProps'

export function ImapAccountsFieldset({
  imapAccounts,
  dispatch,
}: Readonly<ImapAccountsFieldsetProps>) {
  return (
    <fieldset className="border-border space-y-4 rounded-md border p-4">
      <legend className="text-foreground px-1 text-sm font-semibold">
        IMAP accounts
      </legend>
      <p className="text-muted-foreground -mt-1 text-xs">
        The mailboxes your DMARC aggregate reports are delivered to.
      </p>
      {imapAccounts.map((acc, index) => (
        <ImapAccountFields
          key={acc._id}
          account={acc}
          index={index}
          canRemove={imapAccounts.length > 1}
          dispatch={dispatch}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="h-10"
        onClick={() => {
          dispatch({ type: 'ADD_ACCOUNT' })
        }}
      >
        <Plus />
        Add another account
      </Button>
    </fieldset>
  )
}
