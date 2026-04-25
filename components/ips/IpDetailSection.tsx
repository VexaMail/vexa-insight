import type { ReactNode } from 'react'

export function IpDetailSection({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section className="glass-card flex flex-col space-y-4 p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <div className="flex flex-col space-y-2">{children}</div>
    </section>
  )
}
