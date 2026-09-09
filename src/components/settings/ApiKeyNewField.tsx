'use client'

import { Button, Input } from '@/components/ui'
import { RefreshCw } from 'lucide-react'
import type { ApiKeyNewFieldProps } from './ApiKeyNewFieldProps'

export function ApiKeyNewField({
  newKey,
  onGenerate,
  onNewKeyChange,
}: ApiKeyNewFieldProps) {
  return (
    <div>
      <label
        htmlFor="settings-secret-key-new"
        className="text-foreground mb-1.5 block text-xs font-medium"
      >
        New API key (optional)
      </label>
      <div className="flex gap-2">
        <Input
          id="settings-secret-key-new"
          type="text"
          value={newKey}
          onChange={(e) => {
            onNewKeyChange(e.target.value)
          }}
          placeholder="Leave empty to keep current key"
          className="bg-card border-border/50 font-mono text-xs"
          autoComplete="off"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onGenerate}
          className="text-muted-foreground hover:text-foreground h-9 w-9 shrink-0"
          aria-label="Generate new API key"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
