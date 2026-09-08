import { MIN_SECRET_LENGTH } from '@/constants/auth'
import {
  INSTALL_INPUT_CLASS_NAME,
  INSTALL_LABEL_CLASS_NAME,
  INSTALL_PLACEHOLDER_CLASS_NAME,
} from '@/constants/install'
import type { InstallAction } from '@/types/install'

/** API key of the new instance, entered or generated in place. */
export function InstallSecretKeyField({
  value,
  dispatch,
  onGenerate,
}: Readonly<{
  value: string
  dispatch: React.Dispatch<InstallAction>
  onGenerate: () => void
}>) {
  return (
    <div>
      <label
        htmlFor="install-secret-key"
        className={`mb-1 ${INSTALL_LABEL_CLASS_NAME}`}
      >
        API key (min {MIN_SECRET_LENGTH} characters)
      </label>
      <div className="flex flex-wrap items-end gap-2">
        <input
          id="install-secret-key"
          type="password"
          value={value}
          onChange={(e) => {
            dispatch({ type: 'SET_SECRET_KEY', payload: e.target.value })
          }}
          minLength={MIN_SECRET_LENGTH}
          required
          placeholder="Generate or enter your API key"
          className={`min-w-[200px] flex-1 ${INSTALL_INPUT_CLASS_NAME} ${INSTALL_PLACEHOLDER_CLASS_NAME}`}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onGenerate}
          className="cursor-pointer rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-500 dark:focus-visible:outline-zinc-400"
        >
          Generate
        </button>
      </div>
    </div>
  )
}
