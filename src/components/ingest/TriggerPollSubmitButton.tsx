'use client'

import { Button } from '@/components/ui'
import { Play, RotateCw } from 'lucide-react'
import type { TriggerPollSubmitButtonProps } from './TriggerPollSubmitButtonProps'

export function TriggerPollSubmitButton({
  isLoading,
  disabled,
}: Readonly<TriggerPollSubmitButtonProps>) {
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      disabled={disabled}
      className="h-8 gap-1.5 px-3 text-xs"
    >
      {isLoading ? (
        <>
          <RotateCw className="h-3 w-3 animate-spin" />
          Running…
        </>
      ) : (
        <>
          <Play className="h-3 w-3" />
          Trigger poll
        </>
      )}
    </Button>
  )
}
