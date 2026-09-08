/** Envelope marker drawn on the timeline rail of an event entry. */
export function IpEventTimelineDot() {
  return (
    <span className="bg-brand-100 dark:bg-brand-900/40 group-hover:bg-brand-200 dark:group-hover:bg-brand-800/80 absolute top-1 -left-[11px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white transition-colors dark:ring-gray-950">
      <svg
        className="text-brand-600 dark:text-brand-400 h-3 w-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    </span>
  )
}
