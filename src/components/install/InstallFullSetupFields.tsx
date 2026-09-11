import { AdvancedSettingsFieldset } from './AdvancedSettingsFieldset'
import { ImapAccountsFieldset } from './ImapAccountsFieldset'
import type { InstallFullSetupFieldsProps } from './InstallFullSetupFieldsProps'

/** The fields a full install asks for beyond the admin account. */
export function InstallFullSetupFields({
  state,
  dispatch,
}: Readonly<InstallFullSetupFieldsProps>) {
  return (
    <>
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
  )
}
