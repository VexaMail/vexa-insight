'use client'

import type { ActionState } from '@/actions/ActionState'
import { loginAction } from '@/actions/login'
import { ThemeToggle } from '@/components/shell'
import Image from 'next/image'
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
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/vexa-insight-icon.svg"
              alt="Vexa Insight"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Welcome back to Vexa Mail Insight
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {state.error}
            </div>
          )}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert(
                    'For security reasons, password recovery in open-source deployments must be performed via the server console.\\n\\nPlease run the CLI recovery script on your server: npx tsx scripts/recovery.ts',
                  )
                }}
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
