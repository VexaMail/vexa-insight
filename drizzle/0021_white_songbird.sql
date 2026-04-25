CREATE TABLE `normalized_event_dkim_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` integer NOT NULL,
	`domain` text NOT NULL,
	`selector` text NOT NULL,
	`result` text NOT NULL,
	`is_aligned` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `normalized_events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `dkim_results_event_id_idx` ON `normalized_event_dkim_results` (`event_id`);--> statement-breakpoint
CREATE TABLE `normalized_event_policy_overrides` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` integer NOT NULL,
	`type` text NOT NULL,
	`comment` text,
	FOREIGN KEY (`event_id`) REFERENCES `normalized_events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `policy_overrides_event_id_idx` ON `normalized_event_policy_overrides` (`event_id`);