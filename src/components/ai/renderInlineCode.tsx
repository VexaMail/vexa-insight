import type { ReactElement } from 'react'

/**
 * Renders inline code blocks from backtick-wrapped text.
 * Splits "text \`code\` more text" into [text, <code>code</code>, more text].
 */
export function renderInlineCode(text: string): ReactElement {
  const match = /`([^`]+)`/.exec(text)

  if (match?.index === undefined) {
    return <span>{text}</span>
  }

  const [matchedText, code] = match
  const remainingText = text.slice(match.index + matchedText.length)

  return (
    <>
      {text.slice(0, match.index)}
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
        {code}
      </code>
      {renderInlineCode(remainingText)}
    </>
  )
}
