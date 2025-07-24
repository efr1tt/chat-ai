'use client'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/lib/store'
import { addMessage } from '@/lib/store'
import { v4 as uuid } from 'uuid'

export default function Chat() {
  const messages = useSelector((state: RootState) => state.messages)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim() || loading) return
    const userMessage = { id: uuid(), content: input, role: 'user' as const, createdAt: new Date().toISOString() }
    dispatch(addMessage(userMessage))
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      dispatch(addMessage({ id: uuid(), content: data.reply, role: 'assistant', createdAt: new Date().toISOString() }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block bg-gray-800 px-3 py-2 rounded-md">{m.content}</span>
          </div>
        ))}
      </div>
      <div className="p-4 flex gap-2 border-t border-gray-700">
        <input
          className="flex-1 bg-gray-800 rounded-md p-2 text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="bg-blue-600 px-4 py-2 rounded-md" disabled={loading}>Отправить</button>
      </div>
    </div>
  )
}
