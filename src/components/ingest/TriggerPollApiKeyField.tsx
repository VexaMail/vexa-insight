'use client'

import type { TriggerPollApiKeyFieldProps } from './TriggerPollApiKeyFieldProps'

export function TriggerPollApiKeyField({
  value,
  onChange,
}: Readonly<TriggerPollApiKeyFieldProps>) {
  return (
    <div className="min-w-[200px] flex-1">
      <label
        htmlFor="trigger-poll-api-key"
        className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        API key
      </label>
      <input
        id="trigger-poll-api-key"
        type="password"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder="API key"
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        autoComplete="off"
      />
    </div>
  )
}
