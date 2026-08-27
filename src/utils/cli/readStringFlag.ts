/**
 * Reads a `--name <value>` string flag from an argv list, falling back when the
 * flag is absent or is the final argument with nothing after it.
 */
export function readStringFlag(
  argv: string[],
  name: string,
  fallback: string,
): string {
  const index = argv.indexOf(`--${name}`)
  if (index === -1) return fallback
  return argv[index + 1] ?? fallback
}
