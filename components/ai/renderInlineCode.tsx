import type { ReactNode } from 'react'

/**
 * Renders inline code blocks from backtick-wrapped text.
 * Splits "text \`code\` more text" into [text, <code>code</code>, more text].
 */
export function renderInlineCode(text: string): ReactNode[] {
  const parts = text.split(/`([^`]+)`/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
      >
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
