'use client'

import type { ActionState } from '@/actions/ActionState'
import { loginAction } from '@/actions/login'
import {
  AuthScreen,
  LoginErrorBanner,
  LoginPasswordField,
  LoginSubmitButton,
  LoginUsernameField,
} from '@/components/login'
import { useActionState } from 'react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    loginAction,
    undefined,
  )

  return (
    <AuthScreen
      eyebrow="Sign in"
      title="Welcome back"
      description="Sign in to your Vexa Insight console."
    >
      <form action={formAction} className="space-y-4">
        <LoginErrorBanner state={state} />
        <LoginUsernameField />
        <LoginPasswordField />
        <LoginSubmitButton isPending={isPending} />
      </form>
    </AuthScreen>
  )
}
