import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import type { VexaLogoMarkProps } from './VexaLogoMarkProps'

export default function VexaLogoMark({
  collapsed,
  projectName,
}: VexaLogoMarkProps) {
  if (collapsed) {
    return (
      <span className="relative flex h-8 w-8 items-center justify-center">
        <Image
          src="/vexa-insight-icon.svg"
          alt={projectName}
          width={32}
          height={32}
        />
      </span>
    )
  }

  if (projectName === APP_NAME) {
    return (
      <Image
        src="/vexa-insight-logo.svg"
        alt={projectName}
        width={123}
        height={32}
        className="h-8 w-auto"
        priority
      />
    )
  }

  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <Image
        src="/vexa-insight-icon.svg"
        alt=""
        width={32}
        height={32}
        className="shrink-0"
      />
      <span className="text-foreground truncate text-sm font-semibold">
        {projectName}
      </span>
    </span>
  )
}
