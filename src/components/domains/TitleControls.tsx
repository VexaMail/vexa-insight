import { CopyIconButton } from '@/components/ui'
import { ExternalLink } from 'lucide-react'
import type { TitleControlsProps } from './TitleControlsProps'

/** Copy the domain name, or open its website in a new tab. */
export function TitleControls({ domainName }: Readonly<TitleControlsProps>) {
  return (
    <span className="flex shrink-0 items-center">
      <CopyIconButton value={domainName} label="domain name" />
      <a
        href={`https://${domainName}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open https://${domainName} in a new tab`}
        className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </span>
  )
}
