import { DEFAULT_DAYS_BACK, DEFAULT_INTERVAL } from '@/utils/install'
import type { Props } from './Props'

export function AdvancedSettingsFieldset({
  interval,
  daysBack,
  dispatch,
}: Readonly<Props>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="install-interval"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Ingestion interval (minutes, optional)
        </label>
        <input
          id="install-interval"
          type="number"
          min={1}
          max={1440}
          value={interval}
          onChange={(e) => {
            dispatch({
              type: 'SET_INTERVAL',
              payload: parseInt(e.target.value, 10) || DEFAULT_INTERVAL,
            })
          }}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
      </div>
      <div>
        <label
          htmlFor="install-days-back"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Ingestion days back
        </label>
        <input
          id="install-days-back"
          type="number"
          min={1}
          max={365}
          value={daysBack}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10)
            dispatch({
              type: 'SET_DAYS_BACK',
              payload: Number.isFinite(n) && n >= 1 ? n : DEFAULT_DAYS_BACK,
            })
          }}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
      </div>
    </div>
  )
}
