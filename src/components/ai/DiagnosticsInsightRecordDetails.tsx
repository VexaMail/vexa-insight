import type { DiagnosticsInsightCardProps } from './DiagnosticsInsightCardProps'
import { InsightCodeBlock } from './InsightCodeBlock'

/** DNS record and verification command for an improvement insight. */
export function DiagnosticsInsightRecordDetails({
  insight,
}: Readonly<DiagnosticsInsightCardProps>) {
  const { recordHost, recordValue, verifyCommand } = insight
  if (
    insight.tone !== 'improvement' ||
    recordValue === null ||
    recordValue.length === 0
  ) {
    return null
  }

  return (
    <>
      <div className="mt-2 space-y-1.5">
        {recordHost !== null && recordHost !== '' && (
          <InsightCodeBlock label="Record:" value={recordHost} />
        )}
        <InsightCodeBlock label="Value:" value={recordValue} />
      </div>
      {verifyCommand !== null && verifyCommand !== '' ? (
        <InsightCodeBlock
          className="mt-2"
          label="Verify:"
          value={verifyCommand}
        />
      ) : null}
    </>
  )
}
