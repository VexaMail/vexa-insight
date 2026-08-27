'use client'

import { usePassRateRing } from '@/hooks/dashboard'
import PassRateRingDisplay from './PassRateRingDisplay'

export default function PassRateRing() {
  const { rate, isLoading } = usePassRateRing()

  return <PassRateRingDisplay rate={rate} isLoading={isLoading} />
}
