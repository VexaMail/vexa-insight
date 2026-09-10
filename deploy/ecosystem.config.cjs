// Vexa Mail Insight – PM2 ecosystem example.
//
// Install:
//   pnpm install --frozen-lockfile
//   pnpm run build
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save && pm2 startup       # persist across reboots
//
// Update from the dashboard:
//   The Settings → Updates panel detects PM2 via the `pm_id` env var
//   and exposes the "Apply update now" button. PM2's autorestart
//   brings the process back up against the new build after the
//   self-update script terminates the old one.
//
// Adjust `cwd` and `env` to match your install layout.

module.exports = {
  apps: [
    {
      name: 'vexa-insight',
      cwd: '/opt/vexa-insight',
      script: 'pnpm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
      autorestart: true,
      kill_timeout: 30000,
      max_memory_restart: '1G',
      watch: false,
    },
  ],
}
