'use client'

import { m as motion } from 'framer-motion'
import { ApiKeyCurrentField } from './ApiKeyCurrentField'
import { ApiKeySectionHeader } from './ApiKeySectionHeader'
import type { ApiKeySectionProps } from './ApiKeySectionProps'

export default function ApiKeySection({ apiKey, onCopy }: ApiKeySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
      aria-labelledby="settings-api-key-heading"
    >
      <ApiKeySectionHeader />
      <div className="space-y-4">
        <ApiKeyCurrentField apiKey={apiKey} onCopy={onCopy} />
      </div>
    </motion.section>
  )
}
