/**
 * - `insufficient-data`: too few messages or days to judge;
 * - `fix-first`: legitimate mail still fails and would be lost;
 * - `ready`: what fails is forwarding or unknown senders.
 */
export type EnforcementVerdict = 'insufficient-data' | 'fix-first' | 'ready'
