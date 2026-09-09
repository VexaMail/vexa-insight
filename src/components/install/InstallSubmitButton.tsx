import type { InstallSubmitButtonProps } from './InstallSubmitButtonProps'

export function InstallSubmitButton({
  isLoading,
}: Readonly<InstallSubmitButtonProps>) {
  return (
    <div>
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-400"
      >
        {isLoading ? 'Installing…' : 'Complete setup'}
      </button>
    </div>
  )
}
