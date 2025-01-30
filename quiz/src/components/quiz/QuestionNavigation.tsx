import { Button } from "@/components/ui/button"

interface QuestionNavigationProps {
  totalQuestions: number
  currentQuestion: number
  onQuestionChange: (index: number) => void
  userAnswers: (string | null)[]
}

export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  onQuestionChange,
  userAnswers,
}: QuestionNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <Button
          key={i}
          variant={i === currentQuestion ? "default" : "outline"}
          className={`w-10 h-10 ${userAnswers[i] !== null ? "bg-green-500 hover:bg-green-600" : ""}`}
          onClick={() => onQuestionChange(i)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  )
}

