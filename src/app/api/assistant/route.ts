import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message } = await req.json()
  // TODO: integrate Yandex AI here. For now just echo back.
  const reply = `AI echo: ${message}`
  return NextResponse.json({ reply })
}
