import { getDb, sessions } from '@/lib/db'
import { env } from '@/lib/env'
import { cookies } from 'next/headers'
import crypto from 'node:crypto'

export async function createSession(userId: string) {
  const db = getDb()
  const sessionId = crypto.randomBytes(16).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  })

  const cookieStore = await cookies()
  // sameSite: 'lax' is intentional. 'strict' breaks bookmarked logins and
  // top-level navigations from external links (e.g. an email "Sign in" link
  // would fail to attach the cookie on first hop). CSRF for mutating
  // endpoints is enforced separately:
  //   - API routes: `requireSameOrigin` (Sec-Fetch-Site / Origin check) runs
  //     in `withApiAuth` BEFORE the auth gate.
  //   - Server actions: `experimental.serverActions.allowedOrigins` in
  //     `next.config.ts` (driven by VEXA_ALLOWED_ORIGINS).
  // So the session cookie alone cannot be replayed cross-origin against a
  // state-changing endpoint.
  cookieStore.set('session', sessionId, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}
