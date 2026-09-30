import type { SndsDataRow } from '@/types/snds'
import { extractSndsRecords } from './extractSndsRecords'
import { parseSndsComplaintRate } from './parseSndsComplaintRate'
import { pickSndsField } from './pickSndsField'
import { toSndsInt } from './toSndsInt'
import { toSndsText } from './toSndsText'

/**
 * Parses an SNDS data report. Field names follow the CSV export's columns;
 * rows without an IP are dropped, everything else is kept with nulls.
 */
export function parseSndsDataRows(body: unknown): SndsDataRow[] {
  const rows: SndsDataRow[] = []
  for (const record of extractSndsRecords(body)) {
    const text = (aliases: readonly string[]) =>
      toSndsText(pickSndsField(record, aliases))
    const int = (aliases: readonly string[]) =>
      toSndsInt(pickSndsField(record, aliases))
    const ip = text(['ipaddress', 'ip'])
    if (!ip) continue
    rows.push({
      ip,
      activityStart: text(['activitystart', 'activitystartdate']),
      activityEnd: text(['activityend', 'activityenddate']),
      rcptCommands: int(['rcptcommands', 'rcptcommand', 'rcpt']),
      dataCommands: int(['datacommands', 'datacommand']),
      messageRecipients: int(['messagerecipients', 'recipients']),
      filterResult:
        text(['filterresult', 'filterresults', 'filter'])?.toUpperCase() ??
        null,
      complaintRate: parseSndsComplaintRate(
        pickSndsField(record, ['complaintrate', 'complaintrates']),
      ),
      trapPeriodStart: text(['trapmessageperiodstart', 'trapperiodstart']),
      trapPeriodEnd: text(['trapmessageperiodend', 'trapperiodend']),
      trapHits: int(['spamtraphits', 'traphits', 'trapmessages']),
      sampleHelo: text(['samplehelo', 'helo']),
      sampleMailFrom: text(['samplemailfrom', 'mailfrom']),
      comments: text(['samplecomments', 'comments', 'comment']),
      raw: JSON.stringify(record),
    })
  }
  return rows
}
