/** "3 of 1,396 messages": a part and its denominator, pluralised on the total. */
export function describeOutOf(
  part: number,
  total: number,
  noun: string,
): string {
  const plural = total === 1 ? noun : `${noun}s`
  return `${part.toLocaleString('en-US')} of ${total.toLocaleString('en-US')} ${plural}`
}
