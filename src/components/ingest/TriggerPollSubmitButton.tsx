'use client'

import { Button } from '@/components/ui'
import { Play, RotateCw } from 'lucide-react'
import type { TriggerPollSubmitButtonProps } from './TriggerPollSubmitButtonProps'

export function TriggerPollSubmitButton({
  isLoading,
  disabled,
}: Readonly<TriggerPollSubmitButtonProps>) {
  return (
    <Button type="submit" disabled={disabled} className="h-10 w-full">
      {isLoading ? (
        <>
          <RotateCw className="animate-spin" aria-hidden="true" />
          Running…
        </>
      ) : (
        <>
          <Play aria-hidden="true" />
          Trigger now
        </>
      )}
    </Button>
  )
}
