import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { HEADER_BUTTON_CLASS } from '@/constants/domains'
import type { DomainActionsMenuProps } from '@/types/domains'
import { domainTabHref, sourcesCsvHref } from '@/utils/domains'
import {
  Download,
  ExternalLink,
  History,
  MoreVertical,
  Network,
} from 'lucide-react'
import { MenuLinkItem } from './MenuLinkItem'

/** Less frequent links: the website, DNS, history and the sources file. */
export function DomainMoreMenu({
  domainId,
  domainName,
}: Readonly<DomainActionsMenuProps>) {
  return (
    <Popover>
      <PopoverTrigger
        className={`${HEADER_BUTTON_CLASS} w-10 justify-center px-0`}
        aria-label="More domain actions"
      >
        <MoreVertical className="h-4 w-4" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-1.5">
        <MenuLinkItem
          href={domainTabHref(domainName, 'dns')}
          icon={<Network />}
        >
          DNS records
        </MenuLinkItem>
        <MenuLinkItem
          href={domainTabHref(domainName, 'history')}
          icon={<History />}
        >
          History
        </MenuLinkItem>
        <MenuLinkItem
          href={sourcesCsvHref(domainId)}
          icon={<Download />}
          download
        >
          Download sources (CSV)
        </MenuLinkItem>
        <MenuLinkItem
          href={`https://${domainName}`}
          icon={<ExternalLink />}
          external
        >
          Open {domainName}
        </MenuLinkItem>
      </PopoverContent>
    </Popover>
  )
}
