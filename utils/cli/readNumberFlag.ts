/**
 * Reads a `--name <value>` numeric flag from an argv list, falling back when
 * the flag is absent or its value is not a finite number.
 */
export function readNumberFlag(
  argv: string[],
  name: string,
  fallback: number,
): number {
  const index = argv.indexOf(`--${name}`)
  if (index === -1) return fallback
  const parsed = Number(argv[index + 1])
  return Number.isFinite(parsed) ? parsed : fallback
}
