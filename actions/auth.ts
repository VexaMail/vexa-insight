'use server'

import { invalidateSession } from '@/services/auth'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  await invalidateSession()
  redirect('/login')
}
