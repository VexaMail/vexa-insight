/**
 * Single IMAP account in install payload.
 */
export type ImapAccountInstall = {
  label: string
  server: string
  port: number
  username: string
  password: string
}
