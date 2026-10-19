import type { DropdownMenuItemProps } from './DropdownMenuItemProps'

export type DropdownMenuLinkItemProps = Omit<DropdownMenuItemProps, 'href'> & {
  readonly href: string
}
