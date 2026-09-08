import { Button } from '@/components/ui'
import { m as motion } from 'framer-motion'

/** Submit button of the settings form and the outcome of the last save. */
export function SettingsSaveBar({
  saveStatus,
  message,
  canSave,
}: Readonly<{ saveStatus: string; message: string; canSave: boolean }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex flex-wrap items-center gap-4"
    >
      <Button type="submit" disabled={saveStatus === 'loading' || !canSave}>
        {saveStatus === 'loading' ? 'Saving…' : 'Save configuration'}
      </Button>
      {message !== '' && (
        <p
          role="status"
          className={`text-sm ${saveStatus === 'error' ? 'text-danger' : 'text-success'}`}
        >
          {message}
        </p>
      )}
    </motion.div>
  )
}
