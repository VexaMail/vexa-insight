import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui'
import type { CommandPaletteResultsProps } from '@/types/shell'
import { ArrowRight } from 'lucide-react'

/** The "Jump to" entities and matching pages under the palette input. */
export function CommandPaletteResults({
  targets,
  pages,
  onGo,
}: Readonly<CommandPaletteResultsProps>) {
  return (
    <CommandList className="max-h-[60vh] p-1">
      <CommandEmpty className="text-muted-foreground px-3 py-6 text-center text-sm">
        Nothing matches. Try an IP, a domain or a report number.
      </CommandEmpty>
      {targets.length > 0 ? (
        <CommandGroup heading="Jump to">
          {targets.map((target) => (
            <CommandItem
              key={target.href}
              value={target.href}
              onSelect={onGo}
              className="min-h-10 cursor-pointer"
            >
              <span className="truncate font-mono">{target.label}</span>
              <span className="text-muted-foreground ml-auto text-xs">
                {target.hint}
              </span>
              <ArrowRight className="text-muted-foreground" />
            </CommandItem>
          ))}
        </CommandGroup>
      ) : null}
      {pages.length > 0 ? (
        <CommandGroup heading="Pages">
          {pages.map((item) => (
            <CommandItem
              key={item.url}
              value={item.url}
              onSelect={onGo}
              className="min-h-10 cursor-pointer"
            >
              <item.icon className="text-muted-foreground" />
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
      ) : null}
    </CommandList>
  )
}
