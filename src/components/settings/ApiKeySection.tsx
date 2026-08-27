'use client'

import { Button, Input } from '@/components/ui'
import { m as motion } from 'framer-motion'
import { Copy, Key, RefreshCw } from 'lucide-react'
import type { ApiKeySectionProps } from './ApiKeySectionProps'

export default function ApiKeySection({
  apiKey,
  newKey,
  onCopy,
  onGenerate,
  onNewKeyChange,
}: ApiKeySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
      aria-labelledby="settings-api-key-heading"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <Key className="h-4 w-4" />
        </div>
        <div>
          <h2
            id="settings-api-key-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            API Key
          </h2>
          <p className="text-muted-foreground text-xs">
            Used for API calls, crons, and external scripts
          </p>
        </div>
      </div>
      <div className="space-y-4">
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
              onChange={(e) => onNewKeyChange(e.target.value)}
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
      </div>
    </motion.section>
  )
}
