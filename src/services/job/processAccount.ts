import { runFetchAndIngest } from '@/services/imap'
import { accountFetchHooks } from './accountFetchHooks'
import type { AccountResult } from './AccountResult'
import type { ProcessAccountInput } from './ProcessAccountInput'
import { reportAccountStart } from './reportAccountStart'

/** Runs fetch + ingest for a single IMAP account. */
export async function processAccount(
  input: ProcessAccountInput,
): Promise<AccountResult> {
  const { account, days } = input

  await reportAccountStart(input)

  try {
    const fetchResult = await runFetchAndIngest(
      days,
      account,
      accountFetchHooks(input),
    )

    return {
      processed: fetchResult.processed,
      ingested: fetchResult.ingested,
      skipped: fetchResult.skipped,
      errors: [...fetchResult.errors],
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[ingest] job failed for account:', account.server, message)
    return { processed: 0, ingested: 0, skipped: 0, errors: [message] }
  }
}
