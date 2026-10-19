CREATE TABLE `issue_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`issue_key` text NOT NULL,
	`action` text NOT NULL,
	`snoozed_until` integer,
	`note` text,
	`actor_id` text,
	`actor_name` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `issue_events_key_idx` ON `issue_events` (`issue_key`,`created_at`);