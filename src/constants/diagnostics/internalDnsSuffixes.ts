/**
 * Suffixes that name private or special-use zones (RFC 6761, RFC 6762,
 * RFC 8375 and common split-horizon conventions). A planned SPF include under
 * one of them would only resolve on this server's own network.
 */
export const INTERNAL_DNS_SUFFIXES = [
  '.local',
  '.localhost',
  '.internal',
  '.intranet',
  '.lan',
  '.home',
  '.home.arpa',
  '.corp',
  '.private',
  '.arpa',
  '.test',
  '.invalid',
] as const
