import { Button } from "@/components/ui/button" // shadcn/ui button
import { RocketIcon, ShieldCheckIcon, UsersIcon } from "lucide-react"
import AuthDialog from "@/components/AuthDialog"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">
            AI Chat
          </span>
        </div>
        <div className="flex gap-4">
          <AuthDialog />
        </div>
      </nav>

      {/* HERO BLOCK */}
      <header className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-br from-primary to-indigo-500 text-transparent bg-clip-text">
          Групповой AI-чат для ваших проектов
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
          Общайтесь в реальном времени, приглашайте коллег и друзей, и получайте
          помощь от AI-ассистента прямо в чате.
        </p>
        <a href="/register">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg">
            Начать бесплатно
          </Button>
        </a>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-16 bg-muted">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12` text-center">
            Почему именно AIChat?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UsersIcon className="w-8 h-8 text-primary" />}
              title="Real-time чаты"
              description="Общение с несколькими пользователями и мгновенная доставка сообщений через WebSocket."
            />
            <FeatureCard
              icon={<RocketIcon className="w-8 h-8 text-primary" />}
              title="AI-ассистент"
              description="Позовите искусственный интеллект в чат — получайте советы, анализ, идеи, резюме обсуждения."
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-8 h-8 text-primary" />}
              title="Безопасность и приватность"
              description="Ваша переписка под защитой: JWT-авторизация, приватные комнаты и контроль доступа."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="py-8 text-center text-muted-foreground border-t">
        © 2024 AIChat. Сделано на Next.js, shadcn/ui и Tailwind.
      </footer> */}
    </main>
  )
}

// Вынеси FeatureCard в отдельный компонент (например, components/FeatureCard.tsx):

import { ReactNode } from "react"

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-background rounded-2xl shadow-md p-6 flex flex-col items-center text-center h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
