import type { ReportMessageErrorInput } from '@/types/imap'

/** Reports a per-message failure through the progress hook, if one is set. */
export async function reportMessageError({
  accountId,
  emailDate,
  error,
  options,
  uidStr,
}: ReportMessageErrorInput): Promise<void> {
  if (!options.onEmailProgress) return

  await options.onEmailProgress({
    accountId,
    emailDate,
    uid: uidStr,
    step: 'error',
    error: error instanceof Error ? error.message : String(error),
  })
}
