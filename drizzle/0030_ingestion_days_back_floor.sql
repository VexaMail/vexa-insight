-- Scheduled ingest runs now always use a bounded window. Installs that stored
-- 0 ("no limit") re-scanned the whole mailbox on every run; move them to the
-- 30-day default. A full-mailbox pass is available as an explicit one-off
-- action from the ingest page.
UPDATE `app_settings` SET `ingestion_days_back` = 30 WHERE `ingestion_days_back` < 1;
