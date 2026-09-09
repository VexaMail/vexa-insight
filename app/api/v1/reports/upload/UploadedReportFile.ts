import type { NextResponse } from 'next/server'

export type UploadedReportFile =
  | { readonly ok: true; readonly name: string; readonly buffer: Buffer }
  | { readonly ok: false; readonly response: NextResponse }
