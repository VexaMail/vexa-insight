'use client'

import { useCopyButton } from '@/hooks/ui'
import type { UseDomainActionsReturn } from '@/types/domains'
import { useDnsCheckNow } from './useDnsCheckNow'

/** The domain header's actions: re-run the DNS check, copy the name. */
export function useDomainActions(
  domainId: number,
  domainName: string,
): UseDomainActionsReturn {
  const { checking, message, checkNow } = useDnsCheckNow(domainId)
  const { copied, handleCopy } = useCopyButton(domainName)
  return {
    checking,
    message,
    copied,
    handleCheckNow: checkNow,
    handleCopy: () => {
      void handleCopy()
    },
  }
}
