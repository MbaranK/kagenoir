import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.DATABASE_URL

  let dbTest: string
  try {
    const { Pool } = await import('@neondatabase/serverless')
    const pool = new Pool({ connectionString: url })
    const result = await pool.query('SELECT 1 as ok')
    await pool.end()
    dbTest = 'OK: ' + JSON.stringify(result.rows[0])
  } catch (e: any) {
    dbTest = 'ERROR: ' + e.message
  }

  return NextResponse.json({
    DATABASE_URL_set: !!url,
    DATABASE_URL_length: url?.length ?? 0,
    DATABASE_URL_prefix: url ? url.substring(0, 40) + '...' : null,
    NODE_ENV: process.env.NODE_ENV,
    dbTest,
  })
}
