import { defineConfig } from 'drizzle-kit'
import { resolveDbFilePath } from './src/lib/db/resolveDbFilePath'

// Same resolver the application uses, so `db:migrate` and the running app
// always open the same file for a given DATABASE_URL (absolute or relative).
const filePath = resolveDbFilePath(
  process.env.DATABASE_URL ?? 'file:./data/vexa.db',
)

export default defineConfig({
  schema: './src/lib/db/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: { url: filePath },
})
