CREATE TABLE `event_rollup_daily` (
	`domain_id` integer NOT NULL,
	`day` integer NOT NULL,
	`total_count` integer DEFAULT 0 NOT NULL,
	`passed_count` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`domain_id`, `day`),
	FOREIGN KEY (`domain_id`) REFERENCES `domains`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `rollup_day_idx` ON `event_rollup_daily` (`day`);--> statement-breakpoint
CREATE INDEX `event_raw_report_idx` ON `normalized_events` (`raw_report_id`);--> statement-breakpoint
CREATE INDEX `event_ip_address_idx` ON `normalized_events` (`ip_address_id`);--> statement-breakpoint
CREATE INDEX `event_domain_end_count_idx` ON `normalized_events` (`domain_id`,`report_end_date`,`count`);