import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { HEADER_BUTTON_CLASS } from '@/constants/domains'
import { sourcesCsvHref, sourcesJsonHref } from '@/utils/domains'
import { ChevronDown, FileJson, FileSpreadsheet } from 'lucide-react'
import { MenuLinkItem } from './MenuLinkItem'
import type { SourcesExportMenuProps } from './SourcesExportMenuProps'

/** Download the sending sources of the window as CSV or JSON. */
export function SourcesExportMenu({
  domainId,
  days,
}: Readonly<SourcesExportMenuProps>) {
  return (
    <Popover>
      <PopoverTrigger className={HEADER_BUTTON_CLASS}>
        Export <ChevronDown className="h-4 w-4" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-1.5">
        <MenuLinkItem
          href={sourcesCsvHref(domainId, days)}
          icon={<FileSpreadsheet />}
          download
        >
          CSV
        </MenuLinkItem>
        <MenuLinkItem
          href={sourcesJsonHref(domainId, days)}
          icon={<FileJson />}
          download
        >
          JSON
        </MenuLinkItem>
      </PopoverContent>
    </Popover>
  )
}
