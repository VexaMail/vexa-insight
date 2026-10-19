import { Button } from '@/components/ui'
import { Send } from 'lucide-react'
import type { WebhookTestButtonProps } from './WebhookTestButtonProps'

/**
 * Sends `test.ping`. The API delivers it to every enabled endpoint subscribed
 * to that event, so the button is off for one that is not.
 */
export function WebhookTestButton({
  endpoint,
  busy,
  onTest,
}: Readonly<WebhookTestButtonProps>) {
  const ready = endpoint.enabled && endpoint.events.includes('test.ping')
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-9"
      disabled={busy || !ready}
      onClick={onTest}
      title={
        ready
          ? 'Send test.ping to every enabled endpoint subscribed to it'
          : 'Enable the endpoint and subscribe it to test.ping to send a test'
      }
      aria-label={`Send a test event to ${endpoint.name}`}
    >
      <Send />
      <span className="hidden sm:inline">Test</span>
    </Button>
  )
}
