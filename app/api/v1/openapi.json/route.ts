import { buildOpenApiDocument } from '@/services/api'
import { NextResponse } from 'next/server'

export function GET(): NextResponse {
  const doc = buildOpenApiDocument()
  return NextResponse.json(doc, {
    headers: { 'cache-control': 'public, max-age=300' },
  })
}
