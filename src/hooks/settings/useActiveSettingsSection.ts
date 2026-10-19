'use client'

import { SETTINGS_SECTION_LINKS } from '@/constants/settings'
import { useEffect, useState } from 'react'

/** Id of the settings section nearest the top of the viewport. */
export function useActiveSettingsSection(): string {
  const [activeId, setActiveId] = useState(SETTINGS_SECTION_LINKS[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-10% 0px -75% 0px' },
    )
    for (const link of SETTINGS_SECTION_LINKS) {
      const node = document.getElementById(link.id)
      if (node) observer.observe(node)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  return activeId
}
