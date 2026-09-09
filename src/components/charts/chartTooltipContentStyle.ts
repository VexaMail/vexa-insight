import type { CSSProperties } from 'react'

/** The glass-card look shared by the recharts tooltips. */
export const chartTooltipContentStyle: CSSProperties = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  backdropFilter: 'blur(24px)',
}
