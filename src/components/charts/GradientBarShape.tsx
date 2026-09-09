export function GradientBarShape(props: unknown) {
  const shape = props as Record<string, unknown>
  const x = Number(shape['x'])
  const y = Number(shape['y'])
  const width = Number(shape['width'])
  const height = Number(shape['height'])
  const fill = shape['fill'] as string | undefined
  const payload = shape['payload'] as { gradient?: string } | undefined

  if (
    Number.isNaN(x) ||
    Number.isNaN(y) ||
    Number.isNaN(width) ||
    Number.isNaN(height)
  ) {
    return null
  }

  if (width < 0 || height < 0) {
    return null
  }

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
}
