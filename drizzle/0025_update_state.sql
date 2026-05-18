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
