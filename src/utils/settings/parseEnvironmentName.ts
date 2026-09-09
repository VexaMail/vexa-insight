/**
 * The environment names the settings row accepts; anything else is null.
 */
export function parseEnvironmentName(
  value: string | undefined,
): 'development' | 'staging' | 'production' | null {
  return value === 'development' ||
    value === 'staging' ||
    value === 'production'
    ? value
    : null
}
