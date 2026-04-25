-- Default "ingestion days back" to 0 (no limit) for existing installs.
UPDATE `app_settings` SET `ingestion_days_back` = 0 WHERE `id` = 1;
