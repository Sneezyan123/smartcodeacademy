import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { phone, course, message } = body || {}

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: 'Required field: phone' },
        { status: 400 }
      )
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      ''
    const userAgent = request.headers.get('user-agent') || ''

    const normalizedPhone = '+380' + String(phone).replace(/\D/g, '').slice(-9)

    const submissions = await getCollection('submissions')
    await submissions.insertOne({
      phone: normalizedPhone,
      course: course || '',
      message: message || '',
      ip,
      userAgent,
      createdAt: new Date(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}


