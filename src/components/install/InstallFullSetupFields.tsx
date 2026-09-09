import { AdvancedSettingsFieldset } from './AdvancedSettingsFieldset'
import { ImapAccountsFieldset } from './ImapAccountsFieldset'
import type { InstallFullSetupFieldsProps } from './InstallFullSetupFieldsProps'
import { InstallSecretKeyField } from './InstallSecretKeyField'

/** The fields a full install asks for beyond the admin account. */
export function InstallFullSetupFields({
  state,
  dispatch,
  onGenerateKey,
}: Readonly<InstallFullSetupFieldsProps>) {
  return (
    <>
      <InstallSecretKeyField
        value={state.secretKey}
        dispatch={dispatch}
        onGenerate={onGenerateKey}
      />

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
