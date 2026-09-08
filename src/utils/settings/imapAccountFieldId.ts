/** DOM id for one field of the IMAP account form row at `index`. */
export function imapAccountFieldId(index: number, name: string): string {
  return `imap-account-${String(index)}-${name}`
}
