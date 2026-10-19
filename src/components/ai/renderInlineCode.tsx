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
      <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
        {code}
      </code>
      {renderInlineCode(remainingText)}
    </>
  )
}
