CREATE TABLE `ip_hostname_enrichments` (
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
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ip_hostname_enrichments_ip_unique` ON `ip_hostname_enrichments` (`ip`);--> statement-breakpoint
CREATE UNIQUE INDEX `ip_hostname_ip_idx` ON `ip_hostname_enrichments` (`ip`);--> statement-breakpoint
CREATE INDEX `ip_hostname_next_lookup_idx` ON `ip_hostname_enrichments` (`next_lookup_at`);--> statement-breakpoint
CREATE INDEX `ip_hostname_status_idx` ON `ip_hostname_enrichments` (`lookup_status`);--> statement-breakpoint
CREATE INDEX `ip_hostname_status_next_idx` ON `ip_hostname_enrichments` (`lookup_status`,`next_lookup_at`);--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_lookup_enabled` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_refresh_interval_hours` integer DEFAULT 48 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_timeout_ms` integer DEFAULT 5000 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_max_retries` integer DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_retry_backoff_minutes` integer DEFAULT 15 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_batch_size` integer DEFAULT 100 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_manual_refresh_enabled` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_allow_private_ips` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ip_hostname_negative_cache_hours` integer DEFAULT 48 NOT NULL;