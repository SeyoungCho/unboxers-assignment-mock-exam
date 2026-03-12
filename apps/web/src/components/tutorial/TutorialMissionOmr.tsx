import { cn } from "@/lib/utils";

type TutorialMissionOmrProps = {
  answers: Partial<Record<number, number>>;
  onToggleAnswer: (questionNumber: number, answer: number) => void;
};

const ANSWER_OPTIONS = [1, 2, 3, 4, 5];
const QUESTION_GROUPS = [
  [1, 10],
  [11, 20],
  [21, 30],
] as const;

function TutorialMissionOmr({
  answers,
  onToggleAnswer,
}: TutorialMissionOmrProps) {
  return (
    <div className="w-full max-w-[820px] rounded-[32px] border-2 border-[#7d9be8] bg-[#f8f7f0] p-4 shadow-sm">
      <div className="rounded-[24px] border border-[#7d9be8] bg-[#f8f7f0]">
        <div className="border-b border-[#7d9be8] py-4 text-center text-[32px] font-bold tracking-[0.4em] text-[#2e4b92]">
          객 관 식 답 안
        </div>

        <div className="grid grid-cols-3">
          {QUESTION_GROUPS.map(([start, end]) => (
            <QuestionGroup
              key={start}
              answers={answers}
              end={end}
              onToggleAnswer={onToggleAnswer}
              start={start}
            />
          ))}
        </div>

        <div className="flex justify-around px-8 pb-1 pt-2">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="h-9 w-3 rounded-t-sm bg-black" />
          ))}
        </div>
      </div>
    </div>
  );
}

type QuestionGroupProps = {
  start: number;
  end: number;
  answers: Partial<Record<number, number>>;
  onToggleAnswer: (questionNumber: number, answer: number) => void;
};

function QuestionGroup({
  start,
  end,
  answers,
  onToggleAnswer,
}: QuestionGroupProps) {
  const questionNumbers = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );

  return (
    <div className="border-r border-[#7d9be8] last:border-r-0">
      {questionNumbers.map((questionNumber, index) => (
        <div
          key={questionNumber}
          className={cn(
            "flex border-b border-transparent",
            index === 4 && "border-b-2 border-dashed border-b-[#8fb0ff]",
          )}
        >
          <div className="flex w-10 shrink-0 items-center justify-center border-r border-[#7d9be8] bg-[#dde5f5] text-[18px] font-semibold text-[#324d91]">
            {questionNumber}
          </div>

          <div className="grid flex-1 grid-cols-5 gap-3 px-3 py-4">
            {ANSWER_OPTIONS.map((answer) => {
              const isSelected = answers[questionNumber] === answer;

              return (
                <button
                  key={answer}
                  className={cn(
                    "flex h-14 items-center justify-center rounded-full bg-[#b8b8b8] text-lg font-bold text-white transition-colors",
                    isSelected && "bg-black",
                  )}
                  onClick={() => onToggleAnswer(questionNumber, answer)}
                  type="button"
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TutorialMissionOmr;
