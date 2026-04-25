CREATE TABLE `poll_status` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`is_running` integer DEFAULT false NOT NULL,
	`last_check` integer
);
