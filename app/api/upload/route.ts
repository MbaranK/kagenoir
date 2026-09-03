import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Cloudinary kuruluysa onu kullan, yoksa yerel diske kaydet
const cloudinaryKurulu =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'buraya-cloud-name-girin' &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET

export async function POST(request: NextRequest) {
  const ok = await getSession()
  if (!ok) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'Dosya yok' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  if (!cloudinaryKurulu) {
    return NextResponse.json(
      { error: 'Cloudinary yapılandırması eksik. Vercel ortam değişkenlerini kontrol edip yeniden deploy edin.' },
      { status: 503 },
    )
  }

  try {
    const { v2: cloudinary } = await import('cloudinary')
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'kagenoir',
      transformation: [{ width: 1200, height: 900, crop: 'limit', quality: 'auto' }],
    })
    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    const cloudinaryError = error as { error?: { message?: string }; message?: string }
    const cloudinaryMessage = cloudinaryError.error?.message || cloudinaryError.message || 'Bilinmeyen Cloudinary hatası'
    return NextResponse.json(
      { error: `Cloudinary yüklemesi başarısız: ${cloudinaryMessage}` },
      { status: 502 },
    )
  }

  // Yerel kayıt (geliştirme ortamı)
  const ext = file.name.split('.').pop() || 'jpg'
  const dosyaAdi = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const klasor = join(process.cwd(), 'public', 'uploads')
  await mkdir(klasor, { recursive: true })
  await writeFile(join(klasor, dosyaAdi), buffer)
  return NextResponse.json({ url: `/uploads/${dosyaAdi}` })
}
