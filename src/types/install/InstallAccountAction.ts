import type { InstallAction } from './InstallAction'

/**
 * The install-form actions that edit the IMAP account list.
 */
export type InstallAccountAction = Extract<
  InstallAction,
  { type: 'ADD_ACCOUNT' | 'UPDATE_ACCOUNT' | 'REMOVE_ACCOUNT' }
>
