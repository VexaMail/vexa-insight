import type { XmlTokenKind } from '@/types/reports'

/** Colour of each XML token kind, from the theme tokens of both themes. */
export const xmlTokenClassNames: Record<XmlTokenKind, string> = {
  markup: 'text-muted-foreground',
  tagName: 'text-info',
  attrName: 'text-primary',
  attrValue: 'text-warning',
  comment: 'text-muted-foreground italic',
  text: 'text-foreground',
}
