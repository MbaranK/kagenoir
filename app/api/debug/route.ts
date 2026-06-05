import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.DATABASE_URL

  let directTest: string
  try {
    const { Pool } = await import('@neondatabase/serverless')
    const pool = new Pool({ connectionString: url })
    const result = await pool.query('SELECT 1 as ok')
    await pool.end()
    directTest = 'OK'
  } catch (e: any) {
    directTest = 'ERROR: ' + e.message
  }

  let prismaTest: string
  try {
    const { prisma } = await import('@/lib/prisma')
    const result = await prisma.$queryRaw`SELECT 1 as ok`
    prismaTest = 'OK: ' + JSON.stringify(result)
  } catch (e: any) {
    prismaTest = 'ERROR: ' + e.message
  }

  return NextResponse.json({
    DATABASE_URL_set: !!url,
    DATABASE_URL_length: url?.length ?? 0,
    directTest,
    prismaTest,
    NODE_ENV: process.env.NODE_ENV,
  })
}
