'use client'

import { useEffect } from 'react'

import {
  inPageDiagnosticsTarget,
  revealDiagnosticsAnchor,
} from '@/utils/diagnostics'
import { isPlainLeftClick } from '@/utils/ui'

/**
 * Every panel of the page is already rendered, so a link that only changes the
 * tab or the anchor updates the address bar and shows its panel at once,
 * instead of a server navigation that repeats every DNS lookup. Listening on
 * the document in the capture phase runs before Next's link handler, which
 * then sees the prevented default and stays out.
 */
export function useInPageDiagnosticsLinks(): void {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!isPlainLeftClick(event) || !(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const target = inPageDiagnosticsTarget(
        anchor.href,
        new URL(window.location.href),
      )
      if (!target) return
      event.preventDefault()
      window.history.pushState(
        null,
        '',
        `${target.pathname}${target.search}${target.hash}`,
      )
      void revealDiagnosticsAnchor(target.hash)
    }
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])
}
