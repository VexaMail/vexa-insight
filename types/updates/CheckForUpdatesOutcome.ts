export type CheckForUpdatesOutcome =
  | {
      readonly ok: true
      readonly skipped?: 'disabled' | 'invalid-repo' | 'no-releases'
    }
  | { readonly ok: false; readonly error: string }
