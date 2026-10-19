'use client'

import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '../../hooks/shell/useTheme'

/** Light / dark as a two-segment switch; the active theme is highlighted. */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const segment =
    'inline-flex h-8 w-9 items-center justify-center rounded-md transition-colors duration-150 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none'
  return (
    <div
      role="group"
      aria-label="Theme"
      className="border-border bg-secondary/60 inline-flex items-center gap-0.5 rounded-lg border p-0.5 print:hidden"
    >
      <button
        type="button"
        aria-pressed={theme === 'light'}
        aria-label="Light theme"
        onClick={theme === 'light' ? undefined : toggleTheme}
        className={cn(
          segment,
          theme === 'light'
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-pressed={theme === 'dark'}
        aria-label="Dark theme"
        onClick={theme === 'dark' ? undefined : toggleTheme}
        className={cn(
          segment,
          theme === 'dark'
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  )
}
