import { Button } from '@/components/ui'
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
      <label htmlFor="maxmind-license-key" className="text-sm font-medium">
        MaxMind License Key
      </label>
      <div className="flex gap-2">
        <input
          id="maxmind-license-key"
          type="password"
          placeholder={
            hasLicenseKey ? '••••••••••••••••' : 'Enter license key...'
          }
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          value={licenseKey}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <Button
          type="button"
          variant="secondary"
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
