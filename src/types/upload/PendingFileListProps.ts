/** The files waiting for Upload, each removable while nothing is uploading. */
export type PendingFileListProps = {
  readonly files: readonly File[]
  readonly isUploading: boolean
  readonly onRemove: (index: number) => void
}
