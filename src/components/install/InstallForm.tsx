'use client'

import { useInstallForm } from '@/hooks/install'
import type { InstallFormProps } from '@/types/install'
import { AdvancedSettingsFieldset } from './AdvancedSettingsFieldset'
import { ImapAccountsFieldset } from './ImapAccountsFieldset'
import { InstallAdminFields } from './InstallAdminFields'
import { InstallSecretKeyField } from './InstallSecretKeyField'
import { InstallTokenField } from './InstallTokenField'

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

      <InstallTokenField value={state.installToken} dispatch={dispatch} />

      <InstallAdminFields
        email={state.adminEmail}
        password={state.adminPassword}
        dispatch={dispatch}
      />

      {!isPartial && (
        <>
          <InstallSecretKeyField
            value={state.secretKey}
            dispatch={dispatch}
            onGenerate={handleGenerateKey}
          />

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
          className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-400"
        >
          {state.status === 'loading' ? 'Installing…' : 'Complete setup'}
        </button>
      </div>
    </form>
  )
}
