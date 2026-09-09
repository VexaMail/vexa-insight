import type { BimiLinkCellProps } from './BimiLinkCellProps'

export function BimiLinkCell({ url, icon }: Readonly<BimiLinkCellProps>) {
  if (!url) return 'Not specified'
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary flex items-center gap-1 hover:underline"
    >
      {icon}
      {url}
    </a>
  )
}
