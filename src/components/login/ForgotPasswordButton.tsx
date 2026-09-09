import { PASSWORD_RECOVERY_MESSAGE } from '@/constants/login'

/** Explains the console-only recovery path; there is no reset by email. */
export function ForgotPasswordButton() {
  return (
    <button
      type="button"
      onClick={() => {
        alert(PASSWORD_RECOVERY_MESSAGE)
      }}
      className="bg-transparent p-0 text-xs text-blue-600 hover:underline dark:text-blue-400"
    >
      Forgot password?
    </button>
  )
}
