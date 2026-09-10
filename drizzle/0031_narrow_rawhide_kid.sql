-- Bind a local account to the OIDC identity that owns it. The (issuer,
-- subject) pair is the only identifier the provider guarantees to be stable,
-- so a login is matched on it rather than on a mutable email claim.
--
-- drizzle-kit also emitted an unrelated rebuild of `app_settings` in this
-- file: the column default for `ingestion_days_back` changed in the schema
-- while migration 0030 only rewrote the stored rows, so the snapshot and the
-- table DDL have drifted. That rebuild is destructive, is not part of this
-- change, and is deliberately removed here; the drift is tracked in TODO.md.
ALTER TABLE `users` ADD `oidc_issuer` text;--> statement-breakpoint
ALTER TABLE `users` ADD `oidc_subject` text;
