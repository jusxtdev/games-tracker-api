import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/db/db.schema.js',
  dialect: 'postgresql',
  // verbose: true,
  // strict : true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
