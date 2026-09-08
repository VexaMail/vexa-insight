import type { DkimParsedRecord } from '@/types/diagnostics'
import { KeyRound } from 'lucide-react'
import { RecordDisplay } from '../shared'
import { DkimSelectorChecks } from './DkimSelectorChecks'
import { DkimSelectorIssues } from './DkimSelectorIssues'

/** One selector of the DKIM section: its record, issues and parsed checks. */
export function DkimSelectorCard({
  parsed,
}: Readonly<{ parsed: DkimParsedRecord }>) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-2 border-b pb-3">
        <KeyRound className="text-muted-foreground h-4 w-4" />
        <h4 className="text-foreground text-sm font-bold">
          Selector:{' '}
          <span className="text-primary font-mono">{parsed.selector}</span>
        </h4>
      </div>

      <RecordDisplay label="DKIM" record={parsed.raw} />

      {parsed.errors.length > 0 && (
        <DkimSelectorIssues errors={parsed.errors} />
      )}

      {parsed.raw !== null && <DkimSelectorChecks parsed={parsed} />}
    </div>
  )
}
