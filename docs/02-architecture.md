# Architecture

Monorepo within Next.js: Dashboard UI (App Router), API (Next.js route handlers), background jobs for DMARC fetch/process, persistence with ORM and multi-DB support. Dashboard consumes the same API as the backend.

**Configuration and setup:** The app is configurable from the web. On first run (or when not yet installed), users are redirected to `/install` for an initial setup wizard (project name, API key, IMAP accounts, ingestion defaults). No `.env` is required to start; the database defaults to `data/vexa.db`. After installation, all configuration (project, API key, multiple IMAP accounts, ingestion interval, advanced options) is managed on the Settings page and stored in the database (`app_settings` and `imap_accounts`).
