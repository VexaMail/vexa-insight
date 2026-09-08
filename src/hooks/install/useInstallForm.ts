'use client'

import { MIN_SECRET_LENGTH } from '@/constants/auth'
import {
  DEFAULT_DAYS_BACK,
  DEFAULT_INTERVAL,
  defaultAccount,
  generateSecretKey,
  installReducer,
} from '@/utils/install'
import { useReducer } from 'react'

import type { UseInstallFormReturn } from '@/types/install'

export function useInstallForm(
  isPartial: UseInstallFormReturn['isPartial'],
): UseInstallFormReturn {
  const [state, dispatch] = useReducer(installReducer, {
    adminEmail: '',
    adminPassword: '',
    installToken: '',
    secretKey: '',
    imapAccounts: [defaultAccount()],
    ingestionIntervalMinutes: DEFAULT_INTERVAL,
    ingestionDaysBack: DEFAULT_DAYS_BACK,
    status: 'idle',
    message: '',
  })

  function handleGenerateKey() {
    dispatch({ type: 'SET_SECRET_KEY', payload: generateSecretKey() })
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!isPartial && state.secretKey.length < MIN_SECRET_LENGTH) {
      dispatch({
        type: 'SET_SUBMIT_STATUS',
        status: 'error',
        message: `API key must be at least ${String(MIN_SECRET_LENGTH)} characters.`,
      })
      return
    }

    const valid = state.imapAccounts.filter(
      (a) => a.server.trim() && a.username.trim() && a.password,
    )
    if (!isPartial && valid.length === 0) {
      dispatch({
        type: 'SET_SUBMIT_STATUS',
        status: 'error',
        message:
          'At least one IMAP account with server, username, and password is required.',
      })
      return
    }

    dispatch({ type: 'SET_SUBMIT_STATUS', status: 'loading', message: '' })
    try {
      const res = await fetch('/api/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          installToken: state.installToken.trim(),
          adminEmail: state.adminEmail.trim(),
          adminPassword: state.adminPassword,
          secretKey: state.secretKey.trim(),
          imapAccounts: valid.map((a) => ({
            label: a.label.trim() || 'Account',
            server: a.server.trim(),
            port: a.port,
            username: a.username.trim(),
            password: a.password,
          })),
          ingestionIntervalMinutes: state.ingestionIntervalMinutes,
          ingestionDaysBack: state.ingestionDaysBack,
        }),
      })

      const json = (await res.json()) as
        | { data?: { redirect?: string } }
        | { error?: { code?: string; message?: string } }

      if (!res.ok) {
        const err = json as { error?: { message?: string } }
        dispatch({
          type: 'SET_SUBMIT_STATUS',
          status: 'error',
          message: err.error?.message ?? `Error ${String(res.status)}`,
        })
        return
      }

      const data = (json as { data: { redirect: string } }).data
      if (data.redirect) {
        window.location.href = data.redirect
        return
      }

      window.location.href = '/settings'
    } catch {
      dispatch({
        type: 'SET_SUBMIT_STATUS',
        status: 'error',
        message: 'Request failed.',
      })
    }
  }

  return { state, dispatch, handleGenerateKey, handleSubmit, isPartial }
}
