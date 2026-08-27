import { containsSpfMacro } from './containsSpfMacro'
import { extractSpfEffectiveLookupMechanisms } from './extractSpfEffectiveLookupMechanisms'

/**
 * The evaluated lookup mechanisms whose target carries a macro expansion.
 * These consume a lookup but cannot be expanded into a child node, because
 * their target is only known at evaluation time.
 */
export function extractSpfMacroMechanisms(record: string): string[] {
  return extractSpfEffectiveLookupMechanisms(record).filter(containsSpfMacro)
}
