import { Button } from '@/components/ui'
import type { UploadSubmitButtonProps } from '@/types/upload'
import { Loader2, Upload } from 'lucide-react'

/** The one Upload action: sends every pending file, disabled while the list is empty. */
export function UploadSubmitButton({
  pendingCount,
  isUploading,
}: Readonly<UploadSubmitButtonProps>) {
  return (
    <Button
      type="submit"
      disabled={isUploading || pendingCount === 0}
      className="h-10 w-full cursor-pointer sm:w-auto"
    >
      {isUploading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        <Upload aria-hidden="true" />
      )}
      {isUploading
        ? 'Uploading…'
        : pendingCount > 1
          ? `Upload ${String(pendingCount)} files`
          : 'Upload'}
    </Button>
  )
}
