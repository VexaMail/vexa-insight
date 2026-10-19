'use client'

import { formatPercentTick } from '@/utils/dashboard'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartTooltipContentStyle } from './chartTooltipContentStyle'
import { chartTooltipItemStyle } from './chartTooltipItemStyle'
import { chartTooltipLabelStyle } from './chartTooltipLabelStyle'
import { dateAxisProps } from './dateAxisProps'
import { failRateAreaProps } from './failRateAreaProps'
import { passRateAreaProps } from './passRateAreaProps'
import type { PassRateTrendChartProps } from './PassRateTrendChartProps'
import { percentAxisProps } from './percentAxisProps'
import { TrendGradientDefs } from './TrendGradientDefs'

/** Pass and fail percentage per report day on a fixed 0-100% axis. */
export default function PassRateTrendChart({
  data,
}: Readonly<PassRateTrendChartProps>) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -12, right: 8, top: 4 }}>
        <TrendGradientDefs />
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--chart-grid))"
          vertical={false}
        />
        <XAxis {...dateAxisProps} />
        <YAxis {...percentAxisProps} />
        <Tooltip
          contentStyle={chartTooltipContentStyle}
          labelStyle={chartTooltipLabelStyle}
          itemStyle={chartTooltipItemStyle}
          formatter={formatPercentTick}
        />
        <Area {...passRateAreaProps} />
        <Area {...failRateAreaProps} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
