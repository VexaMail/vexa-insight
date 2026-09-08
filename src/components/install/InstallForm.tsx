'use client'

import { MIN_SECRET_LENGTH } from '@/constants/auth'
import { useInstallForm } from '@/hooks/install'
import type { InstallFormProps } from '@/types/install'
import { AdvancedSettingsFieldset } from './AdvancedSettingsFieldset'
import { ImapAccountsFieldset } from './ImapAccountsFieldset'

export default function InstallForm({ isPartial = false }: InstallFormProps) {
  const { state, dispatch, handleGenerateKey, handleSubmit } =
    useInstallForm(isPartial)

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className="mx-auto max-w-xl space-y-6"
      aria-labelledby="install-form-heading"
    >
      <h2 id="install-form-heading" className="sr-only">
        Configuration
      </h2>
      <div>
        <label
          htmlFor="install-token"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Install token
        </label>
        <input
          id="install-token"
          type="password"
          value={state.installToken}
          onChange={(e) => {
            dispatch({ type: 'SET_INSTALL_TOKEN', payload: e.target.value })
          }}
          required
          placeholder="One-time token from the server logs"
          autoComplete="off"
          aria-describedby="install-token-help"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
        <p
          id="install-token-help"
          className="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
        >
          Printed to the server console on startup.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="install-admin-email"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Admin Username / Email
          </label>
          <input
            id="install-admin-email"
            type="text"
            value={state.adminEmail}
            onChange={(e) => {
              dispatch({ type: 'SET_ADMIN_EMAIL', payload: e.target.value })
            }}
            required
            placeholder="admin@example.com"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
          />
        </div>

        <div>
          <label
            htmlFor="install-admin-password"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Admin Password
          </label>
          <input
            id="install-admin-password"
            type="password"
            value={state.adminPassword}
            onChange={(e) => {
              dispatch({ type: 'SET_ADMIN_PASSWORD', payload: e.target.value })
            }}
            required
            placeholder="Secure password"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
          />
        </div>
      </div>

      {!isPartial && (
        <>
          <div>
            <label
              htmlFor="install-secret-key"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              API key (min {MIN_SECRET_LENGTH} characters)
            </label>
            <div className="flex flex-wrap items-end gap-2">
              <input
                id="install-secret-key"
                type="password"
                value={state.secretKey}
                onChange={(e) => {
                  dispatch({ type: 'SET_SECRET_KEY', payload: e.target.value })
                }}
                minLength={MIN_SECRET_LENGTH}
                required
                placeholder="Generate or enter your API key"
                className="min-w-[200px] flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={handleGenerateKey}
                className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-500 dark:focus-visible:outline-zinc-400"
              >
                Generate
              </button>
            </div>
          </div>

          <ImapAccountsFieldset
            imapAccounts={state.imapAccounts}
            dispatch={dispatch}
          />

          <AdvancedSettingsFieldset
            interval={state.ingestionIntervalMinutes}
            daysBack={state.ingestionDaysBack}
            dispatch={dispatch}
          />
        </>
      )}

      {state.message !== '' && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={state.status === 'loading'}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-400"
        >
          {state.status === 'loading' ? 'Installing…' : 'Complete setup'}
        </button>
      </div>
    </form>
  )
}
