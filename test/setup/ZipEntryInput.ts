/**
 * Input shape for {@link buildZip}: a single in-memory entry consisting of
 * the archive-relative filename and its uncompressed content bytes.
 */
export type ZipEntryInput = {
  name: string
  content: Buffer
}
