import { Button } from '@/components/ui'
import type { InstallSubmitButtonProps } from './InstallSubmitButtonProps'

export function InstallSubmitButton({
  isLoading,
}: Readonly<InstallSubmitButtonProps>) {
  return (
    <div className="border-border flex justify-end border-t pt-5">
      <Button
        type="submit"
        disabled={isLoading}
        className="h-11 w-full sm:w-auto"
      >
        {isLoading ? 'Installing…' : 'Complete setup'}
      </Button>
    </div>
  )
}
