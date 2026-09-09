import type { ImapFolderInfo } from './ImapFolderInfo'

/** The folder fields the folder picker needs, nothing else from IMAP LIST. */
export function serializeImapFolders(folders: readonly ImapFolderInfo[]) {
  return folders.map((f) => ({
    path: f.path,
    name: f.name,
    delimiter: f.delimiter,
    specialUse: f.specialUse,
  }))
}
