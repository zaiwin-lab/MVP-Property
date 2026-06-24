import { PrismaClient } from '../app/generated/prisma/client'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrismaOptions = any

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient(): PrismaClient {
  const dbFilePath = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace('file:', '')
    : path.resolve(process.cwd(), 'prisma/dev.db')

  try {
    // Prisma 7 requires an adapter for SQLite
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
    const adapter = new PrismaBetterSqlite3({ url: dbFilePath })
    return new PrismaClient({ adapter } as AnyPrismaOptions)
  } catch (e) {
    console.warn('[db] Could not initialise Prisma with adapter:', e)
    // Return a stub — API routes catch DB errors gracefully
    return null as unknown as PrismaClient
  }
}

export const prisma: PrismaClient =
  globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
