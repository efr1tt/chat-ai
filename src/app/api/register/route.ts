import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, nickname, password } = await req.json()
    if (!email || !password || !nickname) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: 'Email already used' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { email, nickname, password: hashed } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
