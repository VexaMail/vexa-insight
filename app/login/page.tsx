'use client'

import type { ActionState } from '@/actions/ActionState'
import { loginAction } from '@/actions/login'
import {
  LoginErrorBanner,
  LoginHeader,
  LoginPasswordField,
  LoginSubmitButton,
  LoginUsernameField,
} from '@/components/login'
import { ThemeToggle } from '@/components/shell'
import { useActionState } from 'react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    loginAction,
    undefined,
  )

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <LoginHeader />

        <form action={formAction} className="space-y-4">
          <LoginErrorBanner state={state} />
          <LoginUsernameField />
          <LoginPasswordField />
          <LoginSubmitButton isPending={isPending} />
        </form>
      </div>
    </div>
  )
}
