CREATE TABLE `source_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ip` text NOT NULL,
	`domain_name` text NOT NULL,
	`verdict` text NOT NULL,
	`note` text,
	`reviewed_by_id` text,
	`reviewed_by_name` text,
	`reviewed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `source_reviews_ip_domain_idx` ON `source_reviews` (`ip`,`domain_name`);--> statement-breakpoint
CREATE INDEX `source_reviews_domain_idx` ON `source_reviews` (`domain_name`);