"use client";

import { useState, useEffect, use } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Question from "./Question";
import Timer from "./Timer";
import Results from "./Result";
import type { Quiz as QuizType } from "@/types/data-types";
import QuestionNavigation from "./QuestionNavigation";
import { Dialog } from "@radix-ui/react-dialog";

interface QuizProps {
  quiz: QuizType;
}

export default function Quiz({ quiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quiz.questions.length).fill(null));


  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswers[currentQuestionIndex] || null
  );
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.duration * 60);


  useEffect(() => {
    setSelectedOption(userAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex]);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  if (showResults) {
    return (
      <Results
        questions={quiz.questions}
        userAnswers={userAnswers}
      />
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row justify-between">
       
        <div>

        <CardTitle>{quiz.title}</CardTitle>
        <Timer timeRemaining={timeRemaining} />
   
        </div>

        <Button
          onClick={() => {
            setUserAnswers((prevAnswers) => {
              const updatedAnswers = [...prevAnswers]; // Clone the previous answers array
              updatedAnswers[currentQuestionIndex] = selectedOption; // Set the answer at the current index
              return updatedAnswers; 
            });
            setShowResults(true);
          }}
        >
          Finish Quiz
        </Button>
      </CardHeader>
      <CardContent>
        <QuestionNavigation
          totalQuestions={quiz.questions.length}
          currentQuestion={currentQuestionIndex}
          onQuestionChange={setCurrentQuestionIndex}
          userAnswers={userAnswers}
        />
        <Question
          question={quiz.questions[currentQuestionIndex]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
        <div className="space-x-2">
          {currentQuestionIndex > 0 && (
            <Button
              onClick={() => {
                setUserAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[currentQuestionIndex] = selectedOption;
                return updatedAnswers;
              });
                
                setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
              }}
            >
              {selectedOption!=null ? "Save & Previous" : "Previous"}
            </Button>
          )}

          <Button
            disabled={selectedOption == null}
            onClick={() => {
              setUserAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[currentQuestionIndex] = selectedOption;
                return updatedAnswers;
              });
            }}
          >
            Save
          </Button>
          {currentQuestionIndex < quiz.questions.length - 1 && (
            <Button
              onClick={() => {
                setUserAnswers((prevAnswers) => {
                  const updatedAnswers = [...prevAnswers];
                  updatedAnswers[currentQuestionIndex] = selectedOption;
                  return updatedAnswers;
                });
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              }}
            >
              {selectedOption!=null ? "Save & Next" : "Next"}
            </Button>
          )}
        </div>

      </CardFooter>
    </Card>
  );
}
