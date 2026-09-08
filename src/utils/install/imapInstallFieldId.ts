/** DOM id for one field of one installer IMAP account row. */
export function imapInstallFieldId(field: string, index: number): string {
  return `install-imap-${field}-${String(index)}`
}
