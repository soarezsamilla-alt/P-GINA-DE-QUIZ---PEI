
import { QuizContainer } from '@/components/quiz/QuizContainer'

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuizContainer />
      </div>
    </main>
  )
}
