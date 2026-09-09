/**
 * Whether the last two labels form a second-level TLD (.co.uk, .com.au, ...)
 * so the registrable domain needs three labels.
 */
export function hasSecondLevelTld(
  lastPart: string,
  secondLastPart: string,
): boolean {
  return (
    (lastPart.length === 2 && secondLastPart.length <= 3) || // .co.uk, .com.au
    secondLastPart === 'co' ||
    secondLastPart === 'com' ||
    secondLastPart === 'org' ||
    secondLastPart === 'net'
  )
}
