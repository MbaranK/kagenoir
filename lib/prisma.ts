import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'

function createPrismaClient() {
  const adapter = new PrismaNeonHTTP(process.env.DATABASE_URL!, {} as any)
  return new PrismaClient({ adapter } as any)
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? createPrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
