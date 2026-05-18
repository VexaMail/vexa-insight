'use client'

import { AlertCircle } from 'lucide-react'
import type { UpdateLastErrorNoticeProps } from './UpdateLastErrorNoticeProps'

export default function UpdateLastErrorNotice({
  message,
}: Readonly<UpdateLastErrorNoticeProps>) {
  return (
    <div className="border-warning/30 bg-warning/5 text-foreground flex items-start gap-2 rounded-md border p-3 text-xs">
      <AlertCircle className="text-warning mt-0.5 h-3.5 w-3.5 shrink-0" />
      <div>
        <p className="font-medium">Last check failed</p>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
