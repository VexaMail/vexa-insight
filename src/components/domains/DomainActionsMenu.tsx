'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { HEADER_BUTTON_CLASS } from '@/constants/domains'
import { useDomainActions } from '@/hooks/domains'
import type { DomainActionsMenuProps } from '@/types/domains'
import { domainTabHref } from '@/utils/domains'
import { Activity, ChevronDown, Copy, FileText, RefreshCw } from 'lucide-react'
import { MenuButtonItem } from './MenuButtonItem'
import { MenuLinkItem } from './MenuLinkItem'

/** Diagnostics, a fresh DNS check, the reports and a copy of the name. */
export function DomainActionsMenu({
  domainId,
  domainName,
}: Readonly<DomainActionsMenuProps>) {
  const actions = useDomainActions(domainId, domainName)
  return (
    <Popover>
      <PopoverTrigger className={HEADER_BUTTON_CLASS}>
        Actions <ChevronDown className="h-4 w-4" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-1.5">
        <MenuLinkItem
          href={`/diagnostics/${encodeURIComponent(domainName)}`}
          icon={<Activity />}
        >
          Open diagnostics
        </MenuLinkItem>
        <MenuButtonItem
          icon={
            <RefreshCw className={actions.checking ? 'animate-spin' : ''} />
          }
          onClick={actions.handleCheckNow}
          disabled={actions.checking}
        >
          {actions.checking ? 'Checking DNS' : 'Re-run DNS check'}
        </MenuButtonItem>
        <MenuLinkItem
          href={domainTabHref(domainName, 'reports')}
          icon={<FileText />}
        >
          Open reports
        </MenuLinkItem>
        <MenuButtonItem icon={<Copy />} onClick={actions.handleCopy}>
          {actions.copied ? 'Copied' : 'Copy domain'}
        </MenuButtonItem>
        {actions.message ? (
          <p
            role="status"
            className="text-muted-foreground px-2.5 py-1.5 text-xs"
          >
            {actions.message}
          </p>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}
