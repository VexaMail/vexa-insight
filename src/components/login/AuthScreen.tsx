import { ThemeToggle } from '@/components/shell'
import { cn } from '@/lib/utils'
import { AuthScreenHeader } from './AuthScreenHeader'
import type { AuthScreenProps } from './AuthScreenProps'
import { AuthWordmark } from './AuthWordmark'

/** Centered console card on the canvas grid, for sign-in and first setup. */
export function AuthScreen({
  eyebrow,
  title,
  description,
  icon,
  footer,
  width = 'narrow',
  children,
}: Readonly<AuthScreenProps>) {
  return (
    <div className="console-canvas bg-background relative flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>
      <main
        className={cn('w-full', width === 'wide' ? 'max-w-2xl' : 'max-w-sm')}
      >
        <div className="mb-6 flex justify-center">
          <AuthWordmark />
        </div>
        <div className="glass-card stat-glow">
          <AuthScreenHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            icon={icon}
          />
          <div className="px-6 py-5">{children}</div>
        </div>
        {footer ? <div className="mt-5">{footer}</div> : null}
        <p className="text-muted-foreground mt-6 text-center font-mono text-[11px] tracking-[0.16em] uppercase">
          Self-hosted DMARC analyzer
        </p>
      </main>
    </div>
  )
}
