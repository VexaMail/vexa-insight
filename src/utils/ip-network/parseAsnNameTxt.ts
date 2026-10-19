/** The holder name from `"64496 | US | arin | 2001-01-01 | EXAMPLE-NET, US"`. */
export function parseAsnNameTxt(txt: string): string | null {
  const name = txt.split('|').at(4)?.trim()
  return name ? name : null
}
