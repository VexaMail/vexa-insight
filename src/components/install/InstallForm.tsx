'use client'

import { useInstallForm } from '@/hooks/install'
import type { InstallFormProps } from '@/types/install'
import { InstallAdminFields } from './InstallAdminFields'
import { InstallFullSetupFields } from './InstallFullSetupFields'
import { InstallSubmitButton } from './InstallSubmitButton'
import { InstallTokenField } from './InstallTokenField'

export default function InstallForm({ isPartial = false }: InstallFormProps) {
  const { state, dispatch, handleSubmit } = useInstallForm(isPartial)

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
        <InstallFullSetupFields state={state} dispatch={dispatch} />
      )}

      {state.message !== '' && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}
      <InstallSubmitButton isLoading={state.status === 'loading'} />
    </form>
  )
}
