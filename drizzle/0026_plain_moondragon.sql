CREATE TABLE `update_state` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`channel` text DEFAULT 'stable' NOT NULL,
	`current_version` text,
	`latest_version` text,
	`latest_url` text,
	`latest_published_at` integer,
	`latest_notes` text,
	`last_checked_at` integer,
	`last_error_at` integer,
	`last_error` text,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `webhook_endpoints` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`events` text NOT NULL,
	`secret` text,
	`last_dispatch_at` integer,
	`last_status` text,
	`last_error` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `webhook_endpoints_enabled_idx` ON `webhook_endpoints` (`enabled`);--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ai_provider_id` text;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ai_api_key_encrypted` text;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ai_api_key_iv` text;--> statement-breakpoint
ALTER TABLE `app_settings` ADD `ai_model` text;