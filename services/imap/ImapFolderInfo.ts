export type ImapFolderInfo = {
  path: string
  name: string
  delimiter: string
  flags: Set<string>
  specialUse?: string
}
