export type CheckForUpdatesOutcome =
  | { readonly ok: true; readonly skipped?: 'disabled' | 'invalid-repo' }
  | { readonly ok: false; readonly error: string }
