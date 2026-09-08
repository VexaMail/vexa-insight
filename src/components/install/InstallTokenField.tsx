import {
  INSTALL_INPUT_CLASS_NAME,
  INSTALL_LABEL_CLASS_NAME,
  INSTALL_PLACEHOLDER_CLASS_NAME,
} from '@/constants/install'
import type { InstallAction } from '@/types/install'

/** One-time install token, printed to the server console on startup. */
export function InstallTokenField({
  value,
  dispatch,
}: Readonly<{ value: string; dispatch: React.Dispatch<InstallAction> }>) {
  return (
    <div>
      <label
        htmlFor="install-token"
        className={`mb-1 ${INSTALL_LABEL_CLASS_NAME}`}
      >
        Install token
      </label>
      <input
        id="install-token"
        type="password"
        value={value}
        onChange={(e) => {
          dispatch({ type: 'SET_INSTALL_TOKEN', payload: e.target.value })
        }}
        required
        placeholder="One-time token from the server logs"
        autoComplete="off"
        aria-describedby="install-token-help"
        className={`${INSTALL_INPUT_CLASS_NAME} ${INSTALL_PLACEHOLDER_CLASS_NAME}`}
      />
      <p
        id="install-token-help"
        className="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
      >
        Printed to the server console on startup.
      </p>
    </div>
  )
}
