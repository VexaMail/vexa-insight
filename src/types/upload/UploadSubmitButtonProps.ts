/** How many files Upload would send, and whether a batch is already going. */
export type UploadSubmitButtonProps = {
  readonly pendingCount: number
  readonly isUploading: boolean
}
