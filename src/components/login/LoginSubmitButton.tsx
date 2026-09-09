import type { LoginSubmitButtonProps } from './LoginSubmitButtonProps'

export function LoginSubmitButton({
  isPending,
}: Readonly<LoginSubmitButtonProps>) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      {isPending ? 'Signing In...' : 'Sign In'}
    </button>
  )
}
