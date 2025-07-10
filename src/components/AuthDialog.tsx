// src/components/AuthDialog.tsx

"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AuthDialog() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")

  // state для форм
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    email: "",
    nickname: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "login" | "register"
  ) {
    if (formType === "login") {
      setLoginForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    } else {
      setRegisterForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    })
    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      setError("")
      setOpen(false)
      // window.location.href = "/chat"; // можно редиректить на чат
    } else {
      const data = await res.json()
      setError(data.message || "Ошибка входа")
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (
      !registerForm.email ||
      !registerForm.nickname ||
      !registerForm.password
    ) {
      setError("Заполните все поля")
      return
    }
    if (registerForm.password.length < 6) {
      setError("Пароль должен быть не короче 6 символов")
      return
    }

    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerForm),
    })

    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      setError("")
      setMode("login")
    } else {
      const data = await res.json()
      setError(data.message || "Ошибка регистрации")
    }
  }

  function resetAll() {
    setLoginForm({ email: "", password: "" })
    setRegisterForm({ email: "", nickname: "", password: "" })
    setError("")
    setSuccess(false)
    setMode("login")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state)
        if (!state) resetAll()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary">Войти</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            {mode === "login" ? "Вход" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>

        {mode === "login" ? (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                value={loginForm.email}
                onChange={(e) => handleInput(e, "login")}
                placeholder="Введите email"
              />
            </div>
            <div>
              <Label htmlFor="login-password">Пароль</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={loginForm.password}
                onChange={(e) => handleInput(e, "login")}
                placeholder="Введите пароль"
              />
            </div>
            <Button type="submit" className="mt-2" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
            {error && <div className="text-red-600 text-center">{error}</div>}
            {success && (
              <div className="text-green-600 text-center">Вход успешен!</div>
            )}
            <div className="text-center mt-4 text-sm">
              Нет аккаунта?{" "}
              <button
                className="underline text-blue-600"
                type="button"
                onClick={() => {
                  setMode("register")
                  setError("")
                  setSuccess(false)
                }}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div>
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={registerForm.email}
                onChange={(e) => handleInput(e, "register")}
                placeholder="Введите email"
              />
            </div>
            <div>
              <Label htmlFor="register-nickname">Логин</Label>
              <Input
                id="register-nickname"
                name="nickname"
                autoComplete="username"
                value={registerForm.nickname}
                onChange={(e) => handleInput(e, "register")}
                placeholder="Ваш логин"
              />
            </div>
            <div>
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={registerForm.password}
                onChange={(e) => handleInput(e, "register")}
                placeholder="Пароль"
              />
            </div>
            <Button type="submit" className="mt-2" disabled={loading}>
              {loading ? "Регистрируем..." : "Зарегистрироваться"}
            </Button>
            {error && <div className="text-red-600 text-center">{error}</div>}
            {success && (
              <div className="text-green-600 text-center">
                Успешно! Теперь войдите.
              </div>
            )}
            <div className="text-center mt-4 text-sm">
              Уже есть аккаунт?{" "}
              <button
                className="underline text-blue-600"
                type="button"
                onClick={() => {
                  setMode("login")
                  setError("")
                  setSuccess(false)
                }}
              >
                Войти
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
