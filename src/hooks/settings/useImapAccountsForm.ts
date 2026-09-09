import type { ImapAccountFormEntry, SettingsFormState } from '@/types/settings'
import { newImapAccountEntry } from '@/utils/settings'
import type { Dispatch, SetStateAction } from 'react'

/** Add, update and remove handlers for the IMAP account rows of the form. */
export function useImapAccountsForm(
  setForm: Dispatch<SetStateAction<SettingsFormState>>,
) {
  function handleImapUpdate(
    index: number,
    updates: Partial<ImapAccountFormEntry>,
  ) {
    setForm((prev) => ({
      ...prev,
      imapAccounts: prev.imapAccounts.map((a, i) =>
        i === index ? { ...a, ...updates } : a,
      ),
    }))
  }

  function handleImapAdd() {
    setForm((prev) => ({
      ...prev,
      imapAccounts: [...prev.imapAccounts, newImapAccountEntry()],
    }))
  }

  function handleImapRemove(index: number) {
    setForm((prev) => ({
      ...prev,
      imapAccounts: prev.imapAccounts.filter((_, i) => i !== index),
    }))
  }

  return { handleImapUpdate, handleImapAdd, handleImapRemove }
}
