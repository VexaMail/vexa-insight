/** Text of the first `<tag>` element in an XML fragment, or null. */
export function readXmlTag(xml: string, tag: string): string | null {
  // The tag names are fixed DMARC element names, never user input.
  // eslint-disable-next-line security/detect-non-literal-regexp
  const match = new RegExp(`<${tag}>\\s*([^<]*?)\\s*</${tag}>`).exec(xml)
  const value = match?.[1]
  return value === undefined || value === '' ? null : value.toLowerCase()
}
