/**
 * Splits one CSV line into cells, honouring double-quoted cells (with `""` as
 * an escaped quote), since SNDS sample comments can contain commas.
 */
export function splitSndsCsvLine(line: string): string[] {
  const cells: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < line.length; i += 1) {
    const char = line.charAt(i)
    if (quoted && char === '"' && line.charAt(i + 1) === '"') {
      cell += '"'
      i += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      cells.push(cell)
      cell = ''
    } else {
      cell += char
    }
  }
  cells.push(cell)
  return cells
}
