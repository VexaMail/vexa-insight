'use client'

import { Button, Input } from '@/components/ui'
import { Copy } from 'lucide-react'
import type { ApiKeyCurrentFieldProps } from './ApiKeyCurrentFieldProps'

export function ApiKeyCurrentField({
  apiKey,
  onCopy,
}: ApiKeyCurrentFieldProps) {
  return (
    <div>
      <label
        htmlFor="settings-config-api-key"
        className="text-foreground mb-1.5 block text-xs font-medium"
      >
        Current API key
      </label>
      <div className="flex gap-2">
        <Input
          id="settings-config-api-key"
          type="text"
          value={apiKey}
          readOnly
          className="bg-card border-border/50 font-mono text-xs"
          autoComplete="off"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onCopy}
          disabled={!apiKey.trim()}
          className="text-muted-foreground hover:text-foreground h-9 w-9 shrink-0"
          aria-label="Copy API key"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
