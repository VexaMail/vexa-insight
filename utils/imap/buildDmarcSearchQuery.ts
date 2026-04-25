/**
 * Builds ImapFlow search query for DMARC report candidates.
 * Use with client.search(buildDmarcSearchQuery(since), { uid: true }) to get candidate UIDs.
 */
export function buildDmarcSearchQuery(since: Date): {
  since: Date
} {
  // We only search by SINCE date on the IMAP server.
  // Searching by OR Subject headers is extremely slow on large mailboxes without full-text indexing.
  // We will perform the Subject and Auto-Submitted checks locally after fetching envelopes.
  return { since }
}
