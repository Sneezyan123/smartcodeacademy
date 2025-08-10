import { NextResponse } from 'next/server'

function escapeHtml(input) {
  const str = String(input ?? '')
  return str.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char])
}

export async function POST(request) {
  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramBotToken || !telegramChatId) {
      return NextResponse.json(
        { ok: false, error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { phone, course, message } = body || {}

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: 'Required field: phone' },
        { status: 400 }
      )
    }

    const createdAt = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })
    const normalizedPhone = "+380" + phone

    const lines = [
      '<b>Нова заявка зі сайту SmartCode Academy</b>',
      '',
      `<b>Телефон:</b> ${escapeHtml(normalizedPhone)}`,
      course ? `<b>Курс:</b> ${escapeHtml(course)}` : null,
      message ? `<b>Повідомлення:</b>\n${escapeHtml(message)}` : null,
      '',
      `<b>Час:</b> ${escapeHtml(createdAt)}`,
    ].filter(Boolean)
    console.log("hello")

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: lines.join('\n'),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    )

    const tgData = await telegramResponse.json().catch(() => null)

    if (!telegramResponse.ok || !tgData?.ok) {
      return NextResponse.json(
        { ok: false, error: 'Telegram API error', detail: tgData },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}


