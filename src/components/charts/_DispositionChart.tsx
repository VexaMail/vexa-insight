'use client'

import type { DispositionChartProps } from '@/types/charts'
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
import { chartAxisTick } from './chartAxisTick'
import { ChartCardTitle } from './ChartCardTitle'
import { chartTooltipContentStyle } from './chartTooltipContentStyle'
import { chartTooltipItemStyle } from './chartTooltipItemStyle'
import { chartTooltipLabelStyle } from './chartTooltipLabelStyle'
import { dataFromProps } from './dataFromProps'
import { DispositionGradientDefs } from './DispositionGradientDefs'
import { GradientBarShape } from './GradientBarShape'

export default function DispositionChart({
  passed,
  failed,
}: Readonly<DispositionChartProps>) {
  const data = dataFromProps(passed, failed)

  return (
    <div className="glass-card p-5">
      <ChartCardTitle title="Pass vs Fail" />
      <ResponsiveContainer
        width="100%"
        height={220}
        className="focus:outline-none"
      >
        <BarChart data={data} style={{ outline: 'none' }}>
          <DispositionGradientDefs />
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="name"
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
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
          <Bar dataKey="count" name="Emails" shape={GradientBarShape} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
