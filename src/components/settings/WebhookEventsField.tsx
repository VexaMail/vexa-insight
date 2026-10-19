import { WEBHOOK_EVENT_DESCRIPTIONS } from '@/constants/settings'
import { ALL_WEBHOOK_EVENTS } from '@/types/notifications'
import type { WebhookFieldsProps } from './WebhookFieldsProps'

/** One checkbox per webhook event, with what triggers it. */
export function WebhookEventsField({
  form,
  setForm,
}: Readonly<WebhookFieldsProps>) {
  return (
    <fieldset>
      <legend className="text-foreground mb-1.5 text-sm font-medium">
        Events to send
        <span className="text-muted-foreground ml-2 text-xs font-normal">
          {form.events.length} of {ALL_WEBHOOK_EVENTS.length}
        </span>
      </legend>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {ALL_WEBHOOK_EVENTS.map((event) => (
          <label
            key={event}
            htmlFor={`webhook-event-${event}`}
            className="border-border hover:bg-accent/50 has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5 grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 rounded-md border px-3 py-2 transition-colors duration-150"
          >
            <input
              id={`webhook-event-${event}`}
              type="checkbox"
              checked={form.events.includes(event)}
              onChange={(e) => {
                const on = e.target.checked
                setForm((prev) => ({
                  ...prev,
                  events: on
                    ? [...prev.events, event]
                    : prev.events.filter((x) => x !== event),
                }))
              }}
              className="accent-primary row-span-2 mt-0.5 h-4 w-4"
            />
            <span className="text-foreground font-mono text-xs">{event}</span>
            <span className="text-muted-foreground text-xs">
              {WEBHOOK_EVENT_DESCRIPTIONS[event]}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
