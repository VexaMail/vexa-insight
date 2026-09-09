import { UserCredentialFields } from './UserCredentialFields'
import { UserDomainAccessFields } from './UserDomainAccessFields'
import type { UserModalFieldsProps } from './UserModalFieldsProps'
import { UserRoleField } from './UserRoleField'

export function UserModalFields({
  form,
  isEdit,
}: Readonly<UserModalFieldsProps>) {
  return (
    <>
      <UserCredentialFields
        username={form.username}
        password={form.password}
        isEdit={isEdit}
        onUsernameChange={form.setUsername}
        onPasswordChange={form.setPassword}
      />
      <UserRoleField role={form.role} onChange={form.setRole} />
      <UserDomainAccessFields
        domainMode={form.domainMode}
        domainsInput={form.domainsInput}
        onModeChange={form.setDomainMode}
        onDomainsChange={form.setDomainsInput}
      />
    </>
  )
}
