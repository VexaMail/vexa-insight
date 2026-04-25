export function IpDetailEmptyState({ message }: Readonly<{ message: string }>) {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
      {message}
    </div>
  )
}
