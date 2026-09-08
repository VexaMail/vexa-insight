import type { ProcessAccountInput } from './ProcessAccountInput'

/** Flush the "starting account N/M" status line before the fetch begins. */
export async function reportAccountStart(
  input: ProcessAccountInput,
): Promise<void> {
  const position = `${String(input.accountIndex + 1)}/${String(input.totalAccounts)}`

  await input.coalescer.report(
    { statusText: `Starting account ${position}: ${input.account.server}…` },
    true,
  )
}
