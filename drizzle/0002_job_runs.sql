CREATE TABLE `job_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`run_at` integer NOT NULL,
	`success` integer NOT NULL,
	`processed` integer DEFAULT 0 NOT NULL,
	`ingested` integer DEFAULT 0 NOT NULL,
	`error_count` integer DEFAULT 0 NOT NULL
);
