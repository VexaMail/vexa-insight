import type { XmlTokenKind } from '@/types/reports'

/** Colour of each XML token kind, in both themes. */
export const xmlTokenClassNames: Record<XmlTokenKind, string> = {
  markup: 'text-zinc-400 dark:text-zinc-500',
  tagName: 'text-sky-700 dark:text-sky-400',
  attrName: 'text-violet-700 dark:text-violet-400',
  attrValue: 'text-amber-700 dark:text-amber-400',
  comment: 'text-zinc-400 italic dark:text-zinc-500',
  text: 'text-zinc-800 dark:text-zinc-200',
}
