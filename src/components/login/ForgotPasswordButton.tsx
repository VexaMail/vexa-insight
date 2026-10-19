import { PASSWORD_RECOVERY_MESSAGE } from '@/constants/login'

/** Explains the console-only recovery path; there is no reset by email. */
export function ForgotPasswordButton() {
  return (
    <button
      type="button"
      onClick={() => {
        alert(PASSWORD_RECOVERY_MESSAGE)
      }}
      className="text-primary focus-visible:ring-ring cursor-pointer rounded-sm bg-transparent p-0 text-xs hover:underline focus-visible:ring-2 focus-visible:outline-none"
    >
      Forgot password?
    </button>
  )
}
