/** Whether the SPF generator has a field for a published term. */
export function isGeneratorSpfTerm(term: string): boolean {
  return /^\+?(?:a|mx|-all|~all|(?:include|ip4|ip6):\S+)$/i.test(term)
}
