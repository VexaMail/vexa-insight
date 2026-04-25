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

export default function TrendChart({ data }: Readonly<TrendChartProps>) {
  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Pass vs Fail Trend
      </h3>
      <ResponsiveContainer
        width="100%"
        height={220}
        className="focus:outline-none"
      >
        <AreaChart data={data} style={{ outline: 'none' }}>
          <defs>
            <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--chart-pass))"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--chart-pass))"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="failGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--chart-fail))"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--chart-fail))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="date"
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
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              backdropFilter: 'blur(24px)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))', fontSize: 12 }}
            itemStyle={{ fontSize: 12 }}
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
