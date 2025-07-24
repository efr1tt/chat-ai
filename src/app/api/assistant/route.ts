import { NextResponse } from 'next/server'

const API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'

export async function POST(req: Request) {
  const { message } = await req.json()
  const token = process.env.YANDEX_API_TOKEN
  const folderId = process.env.YANDEX_FOLDER_ID

  if (!token || !folderId) {
    return NextResponse.json({ message: 'Yandex API not configured' }, { status: 500 })
  }

  const body = {
    modelUri: `gpt://${folderId}/yandexgpt-lite`,
    completionOptions: { stream: false, temperature: 0.3, maxTokens: '100' },
    messages: [{ role: 'user', text: message }]
  }

  const yaRes = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!yaRes.ok) {
    console.error(await yaRes.text())
    return NextResponse.json({ message: 'Error from Yandex API' }, { status: 500 })
  }

  const data = await yaRes.json()
  const reply = data.choices?.[0]?.message?.text || ''
  return NextResponse.json({ reply })
}
