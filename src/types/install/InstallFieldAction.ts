import type { InstallAccountAction } from './InstallAccountAction'
import type { InstallAction } from './InstallAction'

/**
 * The install-form actions that set a single top-level field.
 */
export type InstallFieldAction = Exclude<InstallAction, InstallAccountAction>
