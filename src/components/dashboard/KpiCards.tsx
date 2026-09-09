'use client'

import { useKpiCards } from '@/hooks/dashboard'
import { buildKpiCards } from './buildKpiCards'
import { KpiCard } from './KpiCard'

export default function KpiCards() {
  const { overall, isLoading } = useKpiCards()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {buildKpiCards(overall).map((card) => (
        <KpiCard key={card.title} card={card} isLoading={isLoading} />
      ))}
    </div>
  )
}
