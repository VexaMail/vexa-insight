import type { User } from '@/types/users'
import { parseAllowedDomains } from '@/utils/users'
import type React from 'react'
import { useState } from 'react'

export function useUserModal(user?: User, onSuccess?: () => void) {
  const [username, setUsername] = useState(user?.username || '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(user?.role || 'user')
  const [domainMode, setDomainMode] = useState<'all' | 'selected'>(
    user?.allowedDomains ? 'selected' : 'all',
  )
  const [domainsInput, setDomainsInput] = useState(
    user?.allowedDomains
      ? parseAllowedDomains(user.allowedDomains).join(', ')
      : '',
  )
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')

    const url = user ? `/api/v1/users/${user.id}` : '/api/v1/users'
    const payload: Record<string, string | string[] | null> = { username, role }
    if (password) payload.password = password
    else if (!user) {
      setError('Password is required')
      return
    }

    if (domainMode === 'selected') {
      const arr = domainsInput
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean)
      if (arr.length === 0) {
        setError('Please specify at least one domain or choose "All domains"')
        return
      }
      payload.allowedDomains = arr
    } else {
      payload.allowedDomains = null
    }

    const res = await fetch(url, {
      method: user ? 'PUT' : 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      const err = (await res.json()) as { error?: { message?: string } }
      setError(err.error?.message || 'Error occurred')
    } else {
      if (onSuccess) onSuccess()
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    domainMode,
    setDomainMode,
    domainsInput,
    setDomainsInput,
    error,
    handleSubmit,
  }
}
