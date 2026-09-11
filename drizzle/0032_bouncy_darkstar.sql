ALTER TABLE `app_settings` ADD `installed_at` integer;--> statement-breakpoint
-- Backfill: before this migration, an instance counted as installed when
-- `secret_key` had moved off its placeholder. Preserve that verdict so
-- existing instances do not fall back into the install wizard.
UPDATE `app_settings`
SET `installed_at` = `updated_at`
WHERE `secret_key` <> 'CHANGE_ME' AND `installed_at` IS NULL;
