import { requireSameOrigin } from '@/services/security'
import type { ApiHandler, WithApiAuthOptions } from '@/types/api'
import { NextResponse } from 'next/server'
import { requireAdminAccess } from './requireAdminAccess'

export function withApiAuth<TArgs extends unknown[]>(
  handler: ApiHandler<TArgs>,
  options: WithApiAuthOptions = {},
): ApiHandler<TArgs> {
  const authFn = options.authFn ?? requireAdminAccess
  return async (request, ...args) => {
    const csrf = requireSameOrigin(request)
    if (csrf) {
      return NextResponse.json({ error: csrf.error }, { status: csrf.status })
    }
    const auth = await authFn(request)
    if (auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }
    return handler(request, ...args)
  }
}
