/** Groups event ids by raw report so each XML is parsed once. */
export function groupEventIdsByReport(
  events: readonly { eventId: number; rawReportId: number }[],
): Map<number, number[]> {
  const reportMap = new Map<number, number[]>()
  for (const { eventId, rawReportId } of events) {
    if (!reportMap.has(rawReportId)) reportMap.set(rawReportId, [])
    const group = reportMap.get(rawReportId)
    if (group) group.push(eventId)
  }
  return reportMap
}
