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
import { dataFromProps } from './dataFromProps'

export default function DispositionChart({
  passed,
  failed,
}: Readonly<DispositionChartProps>) {
  const data = dataFromProps(passed, failed)

  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Pass vs Fail
      </h3>
      <ResponsiveContainer
        width="100%"
        height={220}
        className="focus:outline-none"
      >
        <BarChart data={data} style={{ outline: 'none' }}>
          <defs>
            <linearGradient id="gradientPass" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--success))"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--success))"
                stopOpacity={0.4}
              />
            </linearGradient>
            <linearGradient id="gradientFail" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--danger))"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--danger))"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>
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
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              backdropFilter: 'blur(24px)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))', fontSize: 12 }}
            itemStyle={{ fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
          <Bar
            dataKey="count"
            name="Emails"
            shape={(props: unknown) => {
              const p = props as Record<string, unknown>
              const x = Number(p.x)
              const y = Number(p.y)
              const width = Number(p.width)
              const height = Number(p.height)
              const fill = p.fill as string | undefined
              const payload = p.payload as { gradient?: string } | undefined

              if (
                Number.isNaN(x) ||
                Number.isNaN(y) ||
                Number.isNaN(width) ||
                Number.isNaN(height)
              )
                return null
              if (width < 0 || height < 0) return null

              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={payload?.gradient || fill || '#ccc'}
                  rx={6}
                  ry={6}
                />
              )
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
