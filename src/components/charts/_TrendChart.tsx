'use client'

import type { TrendChartProps } from '@/types/charts'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxisTick } from './chartAxisTick'
import { ChartCardTitle } from './ChartCardTitle'
import { chartTooltipContentStyle } from './chartTooltipContentStyle'
import { chartTooltipItemStyle } from './chartTooltipItemStyle'
import { chartTooltipLabelStyle } from './chartTooltipLabelStyle'
import { TrendGradientDefs } from './TrendGradientDefs'

export default function TrendChart({ data }: Readonly<TrendChartProps>) {
  return (
    <div className="glass-card p-5">
      <ChartCardTitle title="Pass vs Fail Trend" />
      <ResponsiveContainer
        width="100%"
        height={220}
        className="focus:outline-none"
      >
        <AreaChart data={data} style={{ outline: 'none' }}>
          <TrendGradientDefs />
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
          <Area
            type="monotone"
            dataKey="passed"
            name="Pass"
            stroke="hsl(var(--chart-pass))"
            fill="url(#passGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="failed"
            name="Fail"
            stroke="hsl(var(--chart-fail))"
            fill="url(#failGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
