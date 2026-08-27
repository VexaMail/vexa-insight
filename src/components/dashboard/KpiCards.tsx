'use client'

import { Skeleton } from '@/components/ui'
import { useKpiCards } from '@/hooks/dashboard'
import { FileText, Globe, Mail, ShieldCheck } from 'lucide-react'

export default function KpiCards() {
  const { overall, isLoading } = useKpiCards()

  const cards = [
    {
      title: 'Total Domains',
      value: overall ? overall.totalDomains.toLocaleString() : '—',
      icon: Globe,
    },
    {
      title: 'Total Reports',
      value: overall ? overall.totalReports.toLocaleString() : '—',
      icon: FileText,
    },
    {
      title: 'Total Emails',
      value: overall ? overall.totalEmails.toLocaleString() : '—',
      icon: Mail,
    },
    {
      title: 'Compliance',
      value: overall ? `${overall.overallPassRate.toFixed(1)}%` : '—',
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="glass-card-hover group relative overflow-hidden p-5"
        >
          <div className="bg-primary/5 absolute top-0 right-0 h-24 w-24 -translate-x-6 -translate-y-6 rounded-full transition-transform duration-500 group-hover:scale-150" />
          <div className="relative flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {card.title}
              </p>
              {isLoading ? (
                <Skeleton className="h-9 w-24" />
              ) : (
                <p className="font-display text-foreground text-3xl font-bold tracking-tight">
                  {card.value}
                </p>
              )}
            </div>
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
