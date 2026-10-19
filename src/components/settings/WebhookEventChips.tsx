import type { WebhookEventChipsProps } from './WebhookEventChipsProps'

/** The events an endpoint subscribes to, as small mono chips. */
export function WebhookEventChips({
  events,
}: Readonly<WebhookEventChipsProps>) {
  return (
    <ul className="flex flex-wrap gap-1" aria-label="Subscribed events">
      {events.map((event) => (
        <li
          key={event}
          className="border-border bg-secondary text-secondary-foreground rounded border px-1.5 py-0.5 font-mono text-[11px] leading-4"
        >
          {event}
        </li>
      ))}
    </ul>
  )
}
