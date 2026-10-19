import type { SparklineShapeProps } from '@/types/ui'

/** The line and soft fill of a line sparkline, in a 100x32 box. */
export function SparklineLine({ values, max }: Readonly<SparklineShapeProps>) {
  const step = 100 / (values.length - 1)
  const points = values
    .map((value, index) => {
      const y = 30 - (value / max) * 27
      return `${(index * step).toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
  return (
    <>
      <polygon
        points={`0,32 ${points} 100,32`}
        fill="currentColor"
        opacity="0.12"
      />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  )
}
