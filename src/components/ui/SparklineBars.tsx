import type { SparklineShapeProps } from '@/types/ui'

/** One bar per value, in a 100x32 box; the last bar is full strength. */
export function SparklineBars({ values, max }: Readonly<SparklineShapeProps>) {
  const width = 100 / values.length
  return (
    <>
      {values.map((value, index) => {
        const height = Math.max((value / max) * 30, value > 0 ? 2 : 0.6)
        const x = (index * width + width * 0.18).toFixed(3)
        return (
          <rect
            key={x}
            x={x}
            y={32 - height}
            width={width * 0.64}
            height={height}
            rx="0.6"
            fill="currentColor"
            opacity={index === values.length - 1 ? 1 : 0.55}
          />
        )
      })}
    </>
  )
}
