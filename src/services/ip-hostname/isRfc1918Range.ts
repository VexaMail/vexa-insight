/**
 * 10/8, 172.16/12 and 192.168/16, judged from the first two octets.
 */
export function isRfc1918Range(
  firstPart: number | undefined,
  secondPart: number | undefined,
): boolean {
  return (
    firstPart === 10 ||
    (firstPart === 172 &&
      secondPart !== undefined &&
      secondPart >= 16 &&
      secondPart <= 31) ||
    (firstPart === 192 && secondPart === 168)
  )
}
