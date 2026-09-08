import { AlignmentIndicator } from './AlignmentIndicator'

/** SPF and DKIM alignment indicators of one sending source. */
export function SourceAlignmentCell({
  spfAligned,
  dkimAligned,
}: Readonly<{ spfAligned: boolean; dkimAligned: boolean }>) {
  return (
    <td className="px-3 py-2">
      <div className="flex items-center justify-center gap-1.5">
        <AlignmentIndicator aligned={spfAligned} label="SPF" />
        <AlignmentIndicator aligned={dkimAligned} label="DKIM" />
      </div>
    </td>
  )
}
