import type { ImapAccountField, InstallAction } from '@/types/install'
import type React from 'react'

/** Builds the change handler for one text field of an IMAP account row. */
export function imapAccountFieldUpdater(
  dispatch: React.Dispatch<InstallAction>,
  index: number,
  field: ImapAccountField,
): (value: string) => void {
  return (value: string) => {
    dispatch({ type: 'UPDATE_ACCOUNT', index, field, value })
  }
}
