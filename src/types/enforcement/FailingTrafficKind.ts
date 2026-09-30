/**
 * Why a source's DMARC-failing mail fails, as far as the reports can tell:
 * - `legitimate`: a sender that mostly passes, or a known service, so its
 *   failures are a configuration gap that enforcement would turn into lost mail;
 * - `forwarded`: a mailing list or mailbox provider relaying the mail on;
 * - `unknown`: nothing vouches for it, which is the traffic enforcement stops.
 */
export type FailingTrafficKind = 'legitimate' | 'forwarded' | 'unknown'
