CREATE TABLE `imap_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`server` text DEFAULT '' NOT NULL,
	`port` integer DEFAULT 993 NOT NULL,
	`username` text DEFAULT '' NOT NULL,
	`password` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `imap_accounts` (`label`, `server`, `port`, `username`, `password`, `sort_order`)
SELECT 'Main account', imap_server, imap_port, imap_username, imap_password, 0
FROM app_settings
WHERE id = 1 AND imap_server != '' AND imap_username != '' AND imap_password != '';
