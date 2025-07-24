import { Button } from "@/components/ui/button" // shadcn/ui button
import { FeatureCard } from "@/components/FeatureCard"
import { HeartHandshakeIcon, SmileIcon, ShieldCheckIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* NAVIGATION */}
      <nav className="flex items-center justify-center px-8 py-6 max-w-7xl mx-auto w-full">
        <span className="text-2xl font-extrabold tracking-tight">PsyAssist</span>
      </nav>

      {/* HERO BLOCK */}
      <header className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <HeartHandshakeIcon className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-br from-primary to-indigo-500 text-transparent bg-clip-text">
          AI ассистент для психологической поддержки
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
          Задавайте вопросы и получайте поддержку в удобном чате без регистрации.
        </p>
        <a href="/chat">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg">
            Начать общение
          </Button>
        </a>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-16 bg-muted">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему PsyAssist?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<SmileIcon className="w-8 h-8 text-primary" />}
              title="Просто и удобно"
              description="Откройте чат и начните общение без лишних формальностей."
            />
            <FeatureCard
              icon={<HeartHandshakeIcon className="w-8 h-8 text-primary" />}
              title="Поддержка 24/7"
              description="Искусственный интеллект всегда готов выслушать и помочь."
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-8 h-8 text-primary" />}
              title="Анонимность"
              description="Мы не собираем персональные данные и не требуем регистрации."
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
