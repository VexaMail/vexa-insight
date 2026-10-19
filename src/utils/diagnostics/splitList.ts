/** `a, b c` as `['a', 'b', 'c']`: entries separated by commas or whitespace. */
export function splitList(text: string): string[] {
  return text.split(/[\s,]+/).filter((entry) => entry.length > 0)
}
