import { Button } from '@/components/ui'
import { SETTINGS_CONTROL_CLASS_NAME } from '@/constants/settings'
import { Save } from 'lucide-react'
import type { GeoIpLicenseKeyFieldProps } from './GeoIpLicenseKeyFieldProps'

/** MaxMind license key input and its save button. */
export function GeoIpLicenseKeyField({
  licenseKey,
  hasLicenseKey,
  isLoading,
  onChange,
  onSave,
}: GeoIpLicenseKeyFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="maxmind-license-key"
        className="text-foreground text-sm font-medium"
      >
        MaxMind License Key
      </label>
      <div className="flex gap-2">
        <input
          id="maxmind-license-key"
          type="password"
          placeholder={
            hasLicenseKey ? '••••••••••••••••' : 'Enter license key...'
          }
          className={SETTINGS_CONTROL_CLASS_NAME}
          value={licenseKey}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <Button
          type="button"
          variant="secondary"
          className="h-10 shrink-0"
          disabled={isLoading || !licenseKey.trim()}
          onClick={onSave}
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
