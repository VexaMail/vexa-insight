'use client'

import { Button, Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { useSecretReveal } from '@/hooks/settings'
import { maskSecret } from '@/utils/settings'
import { Copy, Eye, EyeOff } from 'lucide-react'
import type { ApiKeyCurrentFieldProps } from './ApiKeyCurrentFieldProps'

/** The API key, masked until revealed, with a copy control for the real value. */
export function ApiKeyCurrentField({
  apiKey,
  onCopy,
}: ApiKeyCurrentFieldProps) {
  const { isRevealed, handleToggleReveal } = useSecretReveal()
  const hasKey = apiKey.trim() !== ''

  return (
    <div>
      <label
        htmlFor="settings-config-api-key"
        className={SETTINGS_LABEL_CLASS_NAME}
      >
        Current API key
      </label>
      <div className="flex gap-2">
        <Input
          id="settings-config-api-key"
          type="text"
          value={isRevealed ? apiKey : maskSecret(apiKey)}
          readOnly
          className={`${SETTINGS_INPUT_CLASS_NAME} bg-secondary font-mono`}
          autoComplete="off"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleToggleReveal}
          disabled={!hasKey}
          className="h-10 w-10 shrink-0"
          aria-label={isRevealed ? 'Hide API key' : 'Show API key'}
          aria-pressed={isRevealed}
        >
          {isRevealed ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onCopy}
          disabled={!hasKey}
          className="h-10 w-10 shrink-0"
          aria-label="Copy API key"
        >
          <Copy />
        </Button>
      </div>
    </div>
  )
}
