export function describePublicDkimLookup(
  count: number,
  selector: string | undefined,
  unavailable: boolean,
): string {
  if (count > 0)
    return `${String(count)} candidate signing key records found${selector ? ` at selector ${selector}` : ''}.`
  if (unavailable)
    return 'DKIM DNS lookup could not finish; key presence is unknown.'
  return selector
    ? `No signing key found at selector ${selector}.`
    : 'No signing key found at common selectors.'
}
