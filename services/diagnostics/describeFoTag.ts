export function describeFoTag(value: string): string {
  if (value === '1') {
    return "Generate DMARC Failure Reports if DKIM or SPF don't pass or align."
  }
  if (value === 'd') {
    return "Generate DMARC Failure Reports if DKIM doesn't pass or align."
  }
  if (value === 's') {
    return "Generate DMARC Failure Reports if SPF doesn't pass or align."
  }
  return "Generate DMARC Failure reports if DKIM and SPF don't pass or align."
}
