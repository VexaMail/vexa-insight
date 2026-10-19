CREATE TABLE `dns_snapshots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`domain_name` text NOT NULL,
	`record_kind` text NOT NULL,
	`value` text,
	`observed_at` integer NOT NULL,
	`source` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `dns_snapshots_domain_kind_idx` ON `dns_snapshots` (`domain_name`,`record_kind`,`observed_at`);