import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { ad, telefon, mesaj, ilanBaslik, ilanId } = await req.json()

  if (!mesaj?.trim()) {
    return NextResponse.json({ error: 'Mesaj boş olamaz' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const ilanLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://antiksite.vercel.app'}/ilan/${ilanId}`

  await transporter.sendMail({
    from: `"Cansın Antik" <${process.env.GMAIL_USER}>`,
    to: 'barankalakoglu7@gmail.com',
    subject: `Yeni mesaj: ${ilanBaslik}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
        <h2 style="color:#78350f">Cansın Antik — Yeni Mesaj</h2>
        <p><strong>İlan:</strong> <a href="${ilanLink}">${ilanBaslik}</a></p>
        <hr style="border:none;border-top:1px solid #e7e5e4;margin:16px 0"/>
        ${ad ? `<p><strong>Ad:</strong> ${ad}</p>` : ''}
        ${telefon ? `<p><strong>Telefon:</strong> ${telefon}</p>` : ''}
        <p><strong>Mesaj:</strong></p>
        <p style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:12px;white-space:pre-wrap">${mesaj}</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
