-- ACK-DESTRUCTIVE: SQLite table rebuild to change the created_at/updated_at defaults; every row and index is copied and the columns are unchanged
-- The old CURRENT_TIMESTAMP default stored 'YYYY-MM-DD HH:MM:SS' text in timestamp-mode integer columns,
-- which Drizzle reads back as Invalid Date. The UPDATEs at the end convert those rows to unix seconds.
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ip_hostname_enrichments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ip` text NOT NULL,
	`hostname` text,
	`lookup_status` text DEFAULT 'pending' NOT NULL,
	`last_lookup_at` integer,
	`next_lookup_at` integer,
	`last_success_at` integer,
	`lookup_error` text,
	`retry_count` integer DEFAULT 0 NOT NULL,
	`resolver_provider` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_ip_hostname_enrichments`("id", "ip", "hostname", "lookup_status", "last_lookup_at", "next_lookup_at", "last_success_at", "lookup_error", "retry_count", "resolver_provider", "created_at", "updated_at") SELECT "id", "ip", "hostname", "lookup_status", "last_lookup_at", "next_lookup_at", "last_success_at", "lookup_error", "retry_count", "resolver_provider", "created_at", "updated_at" FROM `ip_hostname_enrichments`;--> statement-breakpoint
DROP TABLE `ip_hostname_enrichments`;--> statement-breakpoint
ALTER TABLE `__new_ip_hostname_enrichments` RENAME TO `ip_hostname_enrichments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `ip_hostname_enrichments_ip_unique` ON `ip_hostname_enrichments` (`ip`);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `ip_hostname_ip_idx` ON `ip_hostname_enrichments` (`ip`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `ip_hostname_next_lookup_idx` ON `ip_hostname_enrichments` (`next_lookup_at`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `ip_hostname_status_idx` ON `ip_hostname_enrichments` (`lookup_status`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `ip_hostname_status_next_idx` ON `ip_hostname_enrichments` (`lookup_status`,`next_lookup_at`);--> statement-breakpoint
UPDATE `ip_hostname_enrichments` SET `created_at` = COALESCE(unixepoch(`created_at`), unixepoch()) WHERE typeof(`created_at`) = 'text';--> statement-breakpoint
UPDATE `ip_hostname_enrichments` SET `updated_at` = COALESCE(unixepoch(`updated_at`), unixepoch()) WHERE typeof(`updated_at`) = 'text';
