import type {
  AccountWithId,
  InstallRequestBody,
  InstallState,
} from '@/types/install'

/** Trims the form values into the install request. */
export function buildInstallRequestBody(
  state: InstallState,
  accounts: AccountWithId[],
): InstallRequestBody {
  return {
    installToken: state.installToken.trim(),
    adminEmail: state.adminEmail.trim(),
    adminPassword: state.adminPassword,
    secretKey: state.secretKey.trim(),
    imapAccounts: accounts.map((a) => ({
      label: a.label.trim() || 'Account',
      server: a.server.trim(),
      port: a.port,
      username: a.username.trim(),
      password: a.password,
    })),
    ingestionIntervalMinutes: state.ingestionIntervalMinutes,
    ingestionDaysBack: state.ingestionDaysBack,
  }
}
