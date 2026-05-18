/**
 * Absolute path to bash used for spawning the self-update script.
 * `/bin/bash` is the standard POSIX location and is unwriteable on a
 * properly-configured host — important for the apply-update endpoint
 * since `bash` would otherwise be resolved via $PATH.
 *
 * Override with the `VEXA_BASH` env var on hosts where bash lives
 * elsewhere (e.g. NixOS, custom Alpine layouts).
 */
export const DEFAULT_BASH_PATH = '/bin/bash'
