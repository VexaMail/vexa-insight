import type {
  UserFormInput,
  UserPayload,
  UserPayloadResult,
} from '@/types/users'

/** Validates the modal fields and shapes the request body, or names the error. */
export function buildUserPayload(input: UserFormInput): UserPayloadResult {
  const { username, password, role, domainMode, domainsInput, isEdit } = input
  const payload: UserPayload = { username, role }

  if (password) payload['password'] = password
  else if (!isEdit) return { error: 'Password is required' }

  if (domainMode === 'selected') {
    const arr = domainsInput
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean)
    if (arr.length === 0) {
      return {
        error: 'Please specify at least one domain or choose "All domains"',
      }
    }
    payload['allowedDomains'] = arr
  } else {
    payload['allowedDomains'] = null
  }

  return { payload }
}
