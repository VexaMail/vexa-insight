'use client'

import type { SpfDkimChartProps } from '@/types/charts'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartTooltipContentStyle } from './chartTooltipContentStyle'
import { GradientBarShape } from './GradientBarShape'
import { SpfDkimGradientDefs } from './SpfDkimGradientDefs'
import { toChartData } from './toChartData'

export default function SpfDkimChart({ data }: Readonly<SpfDkimChartProps>) {
  const chartData = toChartData(data)
  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        SPF &amp; DKIM Breakdown
      </h3>
      <ResponsiveContainer
        width="100%"
        height={220}
        className="focus:outline-none"
      >
        <BarChart data={chartData} barSize={36} style={{ outline: 'none' }}>
          <SpfDkimGradientDefs />
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={chartTooltipContentStyle}
            labelStyle={{ color: 'hsl(var(--foreground))', fontSize: 12 }}
            itemStyle={{ fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
          <Bar dataKey="count" name="Count" shape={GradientBarShape} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
