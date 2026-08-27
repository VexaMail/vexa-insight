'use client'

import { Button } from '@/components/ui'
import type { UpgradeOptionProps } from './UpgradeOptionProps'

export default function UpgradeOption({
  title,
  description,
  command,
  badge,
  onCopy,
}: Readonly<UpgradeOptionProps>) {
  return (
    <div className="border-border/50 bg-background/40 rounded-md border p-3">
      <div className="mb-1 flex items-center gap-2">
        <p className="text-foreground text-xs font-semibold">{title}</p>
        {badge ? (
          <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="text-muted-foreground mb-2 text-xs">{description}</p>
      <div className="bg-secondary border-border/50 flex items-center gap-2 rounded-md border px-3 py-2">
        <code className="flex-1 font-mono text-xs break-all">{command}</code>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            onCopy(command)
          }}
        >
          Copy
        </Button>
      </div>
    </div>
  )
}
