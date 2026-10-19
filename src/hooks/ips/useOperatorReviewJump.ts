'use client'

import { OPERATOR_REVIEW_ANCHOR_ID } from '@/constants/ips'
import { useCallback } from 'react'

/**
 * The header link to Operator review: the hash scrolls the panel into view,
 * and focus moves to it so keyboard and screen reader users land there too.
 */
export function useOperatorReviewJump(): () => void {
  return useCallback(() => {
    requestAnimationFrame(() => {
      document
        .getElementById(OPERATOR_REVIEW_ANCHOR_ID)
        ?.focus({ preventScroll: true })
    })
  }, [])
}
