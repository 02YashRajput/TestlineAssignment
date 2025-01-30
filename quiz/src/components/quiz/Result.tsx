import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Question } from "@/types/data-types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

interface ResultsProps {
  questions: Question[];
  userAnswers: (string | null)[];
}
const decodeHtmlEntities = (str: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

export default function Results({ questions, userAnswers }: ResultsProps) {
  const score = userAnswers.filter(
    (answer, index) =>
      answer !== null && questions[index].options[parseInt(answer)].is_correct
  ).length;
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="w-full  mx-auto">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Quiz Results</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-auto">Restart Quiz</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Restart Quiz</DialogTitle>
              <DialogDescription>
                Are you sure you want to restart the quiz?
              </DialogDescription>
              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center">
            {score} / {totalQuestions}
          </p>
          <p className="text-lg text-center mt-2">You scored {percentage}%</p>

          {/* Show each question with user's answer */}
          <div className="mt-4 space-y-4">
            {questions.map((question, qIndex) => {
              const userAnswerIndex = userAnswers[qIndex]
                ? parseInt(userAnswers[qIndex] as string)
                : null;
              const correctAnswerIndex = question.options.findIndex(
                (opt) => opt.is_correct
              );

              return (
                <div key={qIndex} className="p-4 border rounded-lg">
                  <p className="font-semibold">
                    {qIndex + 1}. {question.description}
                  </p>

                  <ul className="mt-2 space-y-2">
                    {question.options.map((option, oIndex) => {
                      const isUserSelected = userAnswerIndex === oIndex;
                      const isCorrect = option.is_correct;

                      return (
                        <li
                          key={oIndex}
                          className={`flex items-center p-2 rounded-md ${
                            isUserSelected
                              ? isCorrect
                                ? "bg-green-300"
                                : "bg-red-300"
                              : ""
                          }`}
                        >
                          <span className="mr-2">{"⭕"}</span>
                          {option.description}
                          <span className="ml-2">
                            {isCorrect ? "✅" : isUserSelected ? "❌" : ""}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <Accordion type="single" collapsible className="mt-3">
                    <AccordionItem value={`explanation-${qIndex}`}>
                      <AccordionTrigger>Explanation</AccordionTrigger>
                      <AccordionContent>
                        <pre className="whitespace-pre-wrap text-sm">
                          {question.detailed_solution ||
                            "No explanation available."}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible className="mt-3">
                    <AccordionItem value={`explanation-${qIndex}`}>
                      <AccordionTrigger>Reading Material</AccordionTrigger>
                      <AccordionContent>
                        {question.reading_material?.content_sections?.map(
                          (section, index) => (
                            <div
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: decodeHtmlEntities(section),
                              }}
                            />
                          )
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="mt-3">
                    <AccordionItem value={`explanation-${qIndex}`}>
                      <AccordionTrigger>Practice Material</AccordionTrigger>
                      <AccordionContent>
                        {question.reading_material?.practice_material?.content?.map(
                          (section, index) => (
                            <div
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: decodeHtmlEntities(section),
                              }}
                            />
                          )
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
