/**
 * Returns true when an SPF term carries a macro expansion (RFC 7208 section 7),
 * e.g. `exists:%{ir}.%{v}._spf.example.com`.
 *
 * Macro targets depend on the connecting IP, HELO name, and sender address, so
 * they cannot be resolved from the domain alone. The tree builder counts their
 * lookup but must not try to expand them: a literal `%{ir}...` DNS query always
 * fails, which would be reported as a missing SPF record.
 */
export function containsSpfMacro(term: string): boolean {
  return term.includes('%{')
}
