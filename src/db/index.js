import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

const DB_URL = process.env.DATABASE_URL

export const db = drizzle(DB_URL)