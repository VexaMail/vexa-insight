/**
 * Print fallback per grade. Printers drop backgrounds when "Background
 * graphics" is off, which would leave the white grade letter invisible on the
 * gradient circle. In print the circle falls back to a colored ring plus
 * colored text, both of which print as foreground regardless of that setting.
 */
export const gradePrintClasses: Record<string, string> = {
  A: 'print:border-emerald-600 print:text-emerald-700',
  B: 'print:border-blue-600 print:text-blue-700',
  C: 'print:border-amber-600 print:text-amber-700',
  D: 'print:border-orange-600 print:text-orange-700',
  F: 'print:border-red-600 print:text-red-700',
}
