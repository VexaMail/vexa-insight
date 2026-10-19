/** The pending upload list and the ways to change it. */
export type UsePendingUploadsReturn = {
  readonly pendingFiles: readonly File[]
  readonly addFiles: (files: File[]) => void
  readonly removeFile: (index: number) => void
  readonly clearFiles: () => void
}
