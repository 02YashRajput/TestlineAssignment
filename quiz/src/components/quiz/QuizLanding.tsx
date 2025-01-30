"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Quiz from "./Quiz"
import { Quiz as QuizType } from "@/types/data-types"

interface QuizLandingProps {
  quiz: QuizType
}

export default function QuizLanding({ quiz }: QuizLandingProps) {
  const [quizStarted, setQuizStarted] = useState(false)

  if (quizStarted) {
    return <Quiz quiz={quiz} />
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-2">
          <li>Topic: {quiz.topic}</li>
          <li>Duration: {quiz.duration} seconds</li>
          <li>Number of questions: {quiz.questions_count}</li>
          <li>Marks per correct answer: {quiz.correct_answer_marks}</li>
          <li>Marks per incorrect answer: {quiz.negative_marks}</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setQuizStarted(true)} className="w-full">
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  )
}

