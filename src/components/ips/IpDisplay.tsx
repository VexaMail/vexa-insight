import { IpDisplayInline } from './IpDisplayInline'
import { IpDisplayNone } from './IpDisplayNone'
import type { IpDisplayProps } from './IpDisplayProps'
import { IpDisplayStacked } from './IpDisplayStacked'

/** Renders an IP address with optional flag and hostname, in one of three layouts. */
export function IpDisplay(props: Readonly<IpDisplayProps>) {
  if (props.layout === 'none') return <IpDisplayNone {...props} />
  if (props.layout === 'inline') return <IpDisplayInline {...props} />
  return <IpDisplayStacked {...props} />
}
