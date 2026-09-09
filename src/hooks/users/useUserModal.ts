import type { User, UserDomainMode, UseUserModalReturn } from '@/types/users'
import {
  buildUserPayload,
  parseAllowedDomains,
  submitUser,
} from '@/utils/users'
import type React from 'react'
import { useState } from 'react'

export function useUserModal(
  user?: User,
  onSuccess?: () => void,
): UseUserModalReturn {
  const [username, setUsername] = useState(user?.username || '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(user?.role || 'user')
  const [domainMode, setDomainMode] = useState<UserDomainMode>(
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

    const built = buildUserPayload({
      username,
      password,
      role,
      domainMode,
      domainsInput,
      isEdit: user !== undefined,
    })
    if ('error' in built) {
      setError(built.error)
      return
    }

    const failure = await submitUser(user, built.payload)
    if (failure !== null) setError(failure)
    else if (onSuccess) onSuccess()
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
