CREATE TABLE `domain_diagnostics` (
	`domain_id` integer PRIMARY KEY NOT NULL,
	`checked_at` integer NOT NULL,
	`resolved` integer NOT NULL,
	`grade` text NOT NULL,
	`percentage` integer NOT NULL,
	`protocols` text NOT NULL,
	FOREIGN KEY (`domain_id`) REFERENCES `domains`(`id`) ON UPDATE no action ON DELETE cascade
);
