CREATE TABLE `ip_addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ip` text NOT NULL,
	`country_code` text(2),
	`emails_sent_count` integer DEFAULT 0 NOT NULL,
	`first_seen_at` integer NOT NULL,
	`last_seen_at` integer NOT NULL,
	`location_last_update` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ip_addresses_ip_unique` ON `ip_addresses` (`ip`);--> statement-breakpoint
CREATE INDEX `ip_location_last_update_idx` ON `ip_addresses` (`location_last_update`);--> statement-breakpoint
CREATE INDEX `ip_country_code_idx` ON `ip_addresses` (`country_code`);