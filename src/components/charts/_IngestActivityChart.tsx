'use client'

import type { IngestActivityChartProps } from '@/types/ingest'
import {
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxisTick } from './chartAxisTick'
import { chartTooltipContentStyle } from './chartTooltipContentStyle'
import { chartTooltipItemStyle } from './chartTooltipItemStyle'
import { chartTooltipLabelStyle } from './chartTooltipLabelStyle'
import { IngestActivityBars } from './IngestActivityBars'

export default function IngestActivityChart({
  data,
}: Readonly<IngestActivityChartProps>) {
  return (
    <ResponsiveContainer
      width="100%"
      height={220}
      className="focus:outline-none"
    >
      <BarChart data={data} style={{ outline: 'none' }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={chartAxisTick}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={chartAxisTick} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={chartTooltipContentStyle}
          labelStyle={chartTooltipLabelStyle}
          itemStyle={chartTooltipItemStyle}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <IngestActivityBars />
      </BarChart>
    </ResponsiveContainer>
  )
}
