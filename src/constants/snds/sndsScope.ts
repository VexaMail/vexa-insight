import { SNDS_CLIENT_ID } from './sndsClientId'

/** `offline_access` is what makes Microsoft return a refresh token. */
export const SNDS_SCOPE = `${SNDS_CLIENT_ID}/.default offline_access`
