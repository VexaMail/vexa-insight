import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import type { AuthResultPopoverProps } from './AuthResultPopoverProps'

/**
 * Makes an authentication badge a button that opens its full result, so a
 * tap on a phone shows what a mouse sees on hover. The hover title stays.
 */
export function AuthResultPopover({
  detail,
  children,
}: Readonly<AuthResultPopoverProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          title={detail}
          aria-label={detail}
          className="focus-visible:ring-ring inline-flex cursor-pointer rounded-md text-left transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none active:opacity-70"
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto max-w-72 px-3 py-2 text-xs"
      >
        {detail}
      </PopoverContent>
    </Popover>
  )
}
