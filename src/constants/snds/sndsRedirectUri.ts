/**
 * The only redirect URI registered for the SNDS client. Nothing listens there:
 * the browser shows a connection error and the admin copies the address, code
 * included, back into Settings.
 */
export const SNDS_REDIRECT_URI = 'http://localhost'
