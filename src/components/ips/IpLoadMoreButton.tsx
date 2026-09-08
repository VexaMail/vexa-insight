import { Loader2 } from 'lucide-react'
import type { IpLoadMoreButtonProps } from './IpLoadMoreButtonProps'

/** Trigger that appends the next page to one of the IP detail lists. */
export function IpLoadMoreButton({
  isLoading,
  onLoadMore,
  label,
}: IpLoadMoreButtonProps) {
  return (
    <div className="flex justify-center pt-6">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
        className="focus:ring-brand-500 flex cursor-pointer items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        {isLoading ? (
          <>
            <Loader2
              className="mr-2 -ml-1 h-4 w-4 animate-spin text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </button>
    </div>
  )
}
