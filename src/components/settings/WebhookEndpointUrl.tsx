import { CopyIconButton } from '@/components/ui'
import type { WebhookEndpointUrlProps } from './WebhookEndpointUrlProps'

/** The target URL in mono, truncated, with a copy control. */
export function WebhookEndpointUrl({ url }: Readonly<WebhookEndpointUrlProps>) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <code
        className="text-muted-foreground min-w-0 truncate font-mono text-xs"
        title={url}
      >
        {url}
      </code>
      <CopyIconButton value={url} label="Endpoint URL" />
    </div>
  )
}
