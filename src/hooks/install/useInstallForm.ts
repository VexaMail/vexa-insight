'use client'

import type { UseInstallFormReturn } from '@/types/install'
import {
  buildInstallRequestBody,
  completeImapAccounts,
  initialInstallState,
  installErrorAction,
  installFormError,
  installReducer,
  postInstall,
} from '@/utils/install'
import { useReducer } from 'react'

export function useInstallForm(
  isPartial: UseInstallFormReturn['isPartial'],
): UseInstallFormReturn {
  const [state, dispatch] = useReducer(installReducer, initialInstallState())

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const accounts = completeImapAccounts(state.imapAccounts)
    const error = installFormError(state, isPartial, accounts)
    if (error !== null) {
      dispatch(installErrorAction(error))
      return
    }

    dispatch({ type: 'SET_SUBMIT_STATUS', status: 'loading', message: '' })
    try {
      const result = await postInstall(buildInstallRequestBody(state, accounts))
      if (!result.ok) {
        dispatch(installErrorAction(result.message))
        return
      }
      window.location.href = result.redirect
    } catch {
      dispatch(installErrorAction('Request failed.'))
    }
  }

  return { state, dispatch, handleSubmit, isPartial }
}
