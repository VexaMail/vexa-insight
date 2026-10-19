import { DropdownMenu, DropdownMenuItem } from '@/components/ui'
import { HEADER_BUTTON_CLASS } from '@/constants/domains'
import { sourcesCsvHref, sourcesJsonHref } from '@/utils/domains'
import { ChevronDown, FileJson, FileSpreadsheet } from 'lucide-react'
import type { SourcesExportMenuProps } from './SourcesExportMenuProps'

/** Download the sending sources of the window as CSV or JSON. */
export function SourcesExportMenu({
  domainId,
  days,
}: Readonly<SourcesExportMenuProps>) {
  return (
    <DropdownMenu
      label="Export sending sources"
      triggerClassName={HEADER_BUTTON_CLASS}
      trigger={
        <>
          Export <ChevronDown className="h-4 w-4" aria-hidden />
        </>
      }
    >
      <DropdownMenuItem
        href={sourcesCsvHref(domainId, days)}
        icon={<FileSpreadsheet />}
        download
      >
        CSV
      </DropdownMenuItem>
      <DropdownMenuItem
        href={sourcesJsonHref(domainId, days)}
        icon={<FileJson />}
        download
      >
        JSON
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
