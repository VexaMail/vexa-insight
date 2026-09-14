import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import VexaLogoMark from './VexaLogoMark'

export default function VexaLogo({
  collapsed = false,
  projectName = APP_NAME,
}: Readonly<{
  collapsed?: boolean
  projectName?: string
}>) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 px-2 py-1"
      suppressHydrationWarning
    >
      <VexaLogoMark collapsed={collapsed} projectName={projectName} />
    </Link>
  )
}
