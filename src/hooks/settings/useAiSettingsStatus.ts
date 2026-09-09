'use client'

import { AI_SETTINGS_MESSAGE_MS } from '@/constants/settings'
import type {
  AiSettingsSaveStatus,
  AiSettingsStatusState,
} from '@/types/settings'
import { useCallback, useState } from 'react'

/** Save status and message, with a success that clears itself after a delay. */
export function useAiSettingsStatus(): AiSettingsStatusState {
  const [saveStatus, setSaveStatus] = useState<AiSettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')

  const reportSuccess = useCallback((text: string) => {
    setSaveStatus('success')
    setMessage(text)
    setTimeout(() => {
      setMessage('')
      setSaveStatus('idle')
    }, AI_SETTINGS_MESSAGE_MS)
  }, [])

  return { saveStatus, setSaveStatus, message, setMessage, reportSuccess }
}
