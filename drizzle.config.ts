import { defineConfig } from 'drizzle-kit'
import path from 'node:path'

const databaseUrl = process.env.DATABASE_URL ?? 'file:./data/vexa.db'
const filePath = databaseUrl.startsWith('file:')
  ? path.resolve(process.cwd(), databaseUrl.replace(/^file:\/?/, ''))
  : databaseUrl

export default defineConfig({
  schema: './src/lib/db/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: { url: filePath },
})
