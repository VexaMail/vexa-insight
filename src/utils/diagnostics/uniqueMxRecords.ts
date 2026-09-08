/** MX records with duplicate priority/exchange pairs removed. */
export function uniqueMxRecords<
  T extends { priority: number; exchange: string },
>(records: T[]): T[] {
  return [
    ...new Map(
      records.map((record) => [
        `${String(record.priority)}:${record.exchange}`,
        record,
      ]),
    ).values(),
  ]
}
