/**
 * A faint wireframe globe behind the top of every page: depth for the
 * console look, never information. Hidden from assistive tech and print.
 */
export function ConsoleBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 360"
      className="text-primary pointer-events-none absolute top-0 right-0 -z-10 h-[360px] w-[600px] max-w-full opacity-[0.16] dark:opacity-[0.28] print:hidden"
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <radialGradient id="console-backdrop-fade" cx="70%" cy="10%" r="75%">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="console-backdrop-mask">
          <rect width="600" height="360" fill="url(#console-backdrop-fade)" />
        </mask>
      </defs>
      <g mask="url(#console-backdrop-mask)" strokeWidth="0.8">
        <circle cx="420" cy="40" r="260" />
        <ellipse cx="420" cy="40" rx="260" ry="90" />
        <ellipse cx="420" cy="40" rx="260" ry="180" />
        <ellipse cx="420" cy="40" rx="90" ry="260" />
        <ellipse cx="420" cy="40" rx="180" ry="260" />
        <line x1="160" y1="40" x2="680" y2="40" />
        <line x1="420" y1="-220" x2="420" y2="300" />
      </g>
      <g mask="url(#console-backdrop-mask)" fill="currentColor" stroke="none">
        <circle cx="244" cy="96" r="2" />
        <circle cx="318" cy="182" r="1.6" />
        <circle cx="512" cy="168" r="2" />
        <circle cx="600" cy="92" r="1.6" />
        <circle cx="388" cy="220" r="1.4" />
      </g>
    </svg>
  )
}
