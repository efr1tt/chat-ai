'use client'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/lib/store'
import { addMessage } from '@/lib/store'
import { v4 as uuid } from 'uuid'

let socket: ReturnType<typeof io> | null = null

export default function Chat() {
  const messages = useSelector((state: RootState) => state.messages)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  useEffect(() => {
    socket = io()
    socket.on('message', (msg: { content: string; role: string }) => {
      dispatch(addMessage({ id: uuid(), content: msg.content, role: msg.role as any, createdAt: new Date().toISOString() }))
    })
    return () => {
      socket?.disconnect()
    }
  }, [dispatch])

  function send() {
    if (!input.trim()) return
    socket?.emit('message', { content: input })
    dispatch(addMessage({ id: uuid(), content: input, role: 'user', createdAt: new Date().toISOString() }))
    setInput('')
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
        <button onClick={send} className="bg-blue-600 px-4 py-2 rounded-md">Send</button>
      </div>
    </div>
  )
}
