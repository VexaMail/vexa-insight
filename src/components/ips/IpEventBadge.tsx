import type { IpEventBadgeProps } from './IpEventBadgeProps'

/** One labelled badge of an event timeline entry. */
export function IpEventBadge({
  label,
  children,
  className = '',
}: IpEventBadgeProps) {
  return (
    <div
      className={`flex items-center space-x-1.5 rounded border border-gray-200 bg-white px-2 py-1 shadow-sm dark:border-gray-800 dark:bg-[#0A0A0A] ${className}`}
    >
      <span className="font-semibold text-gray-400">{label}:</span>
      {children}
    </div>
  )
}
