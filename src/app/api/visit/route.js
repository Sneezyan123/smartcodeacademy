import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

const COOKIE_NAME = 'sc_visit'

export async function POST(request) {
  try {
    // Server-side session safeguard using an HttpOnly session cookie
    const alreadyLogged = request.cookies?.get?.(COOKIE_NAME)?.value
    if (alreadyLogged) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const body = await request.json().catch(() => ({}))
    const {
      path = '',
      referrer = '',
      userAgent = '',
      screen = {},
      locale = '',
    } = body || {}

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      ''

    const doc = {
      type: 'visit',
      path,
      referrer,
      userAgent,
      screen,
      locale,
      ip,
      createdAt: new Date(),
    }

    const visits = await getCollection('logs')
    await visits.insertOne(doc)

    const res = NextResponse.json({ ok: true, created: true })
    // Set session cookie (no maxAge) to avoid duplicate inserts within the same browser session
    res.cookies.set(COOKIE_NAME, '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return res
  } catch (error) {
    // Do not leak details in prod
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


