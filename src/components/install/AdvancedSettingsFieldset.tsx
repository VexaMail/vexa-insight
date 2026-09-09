import { parseDaysBackInput, parseIntervalInput } from '@/utils/install'
import { InstallTextField } from './InstallTextField'
import type { Props } from './Props'

export function AdvancedSettingsFieldset({
  interval,
  daysBack,
  dispatch,
}: Readonly<Props>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InstallTextField
        id="install-interval"
        label="Ingestion interval (minutes, optional)"
        type="number"
        min={1}
        max={1440}
        value={interval}
        onChange={(value) => {
          dispatch({ type: 'SET_INTERVAL', payload: parseIntervalInput(value) })
        }}
      />
      <InstallTextField
        id="install-days-back"
        label="Ingestion days back"
        type="number"
        min={1}
        max={365}
        value={daysBack}
        onChange={(value) => {
          dispatch({
            type: 'SET_DAYS_BACK',
            payload: parseDaysBackInput(value),
          })
        }}
      />
    </div>
  )
}
