import { cn } from "@/lib/utils";
import { useState } from "react";
import SubjectiveAnswerInputPad from "@/components/shared/omr-card/SubjectiveAnswerInputPad";
import { OmrCard, type OmrAnswerMap } from "./OmrCard";

type SubjectiveAnswerTutorialOmrCardProps = {
  answers?: OmrAnswerMap;
  onToggleAnswer?: (questionNumber: number, answer: number) => void;
  className?: string;
  targetQuestionIndex?: number;
  onSelectQuestion?: (index: number) => void;
  onSubmitAnswer?: (index: number, value: string) => void;
};

function normalizeSubjectiveAnswer(value: string) {
  if (!/^\d+$/.test(value)) {
    return value;
  }

  return String(Number(value));
}

function SubjectiveAnswerRow({
  index,
  isTargetQuestion = false,
  value,
  isSelected,
  onSelect,
}: {
  index: number;
  defaultPlaceholder?: string;
  value?: string;
  isTargetQuestion?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const basePlaceholder = isTargetQuestion
    ? "여기를 터치해줘요!"
    : "터치해서 주관식 답안 입력";
  const placeholder = isSelected ? "답안을 입력해주세요" : basePlaceholder;

  return (
    <div className="border-inbrain-light-blue flex h-12 w-full border-t-2 border-r-2 border-l-2 last-of-type:border-b-2">
      <div className="bg-inbrain-light-blue/20 question-number border-inbrain-light-blue text-inbrain-blue flex w-7 items-center justify-center border-r-2 text-[17px] font-semibold">
        {index + 1}
      </div>
      <input
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        readOnly
        className={cn(
          "answer-section placeholder:text-gs4 text-gs1 flex w-full items-center justify-center text-center text-[17px] font-semibold",
          isSelected &&
            "outline-inbrain-light-blue bg-white outline-2 outline-offset-2",
          isTargetQuestion &&
            "outline-inbrain-light-blue outline-2 outline-offset-2",
        )}
        onClick={onSelect}
      />
    </div>
  );
}

export function SubjectiveAnswerTutorialOmrCard({
  answers = {},
  onToggleAnswer,
  className,
  targetQuestionIndex,
  onSelectQuestion,
  onSubmitAnswer,
}: SubjectiveAnswerTutorialOmrCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<
    Record<number, string>
  >({});

  const handleSelectRow = (index: number) => {
    setSelectedIndex(index);
    setDraftValue(subjectiveAnswers[index] ?? "");
    onSelectQuestion?.(index);
  };

  const handleAppendValue = (nextValue: string) => {
    if (selectedIndex === null) {
      return;
    }

    setDraftValue((prevDraftValue) => `${prevDraftValue}${nextValue}`);
  };

  const handleBackspace = () => {
    if (selectedIndex === null) {
      return;
    }

    setDraftValue((prevDraftValue) => prevDraftValue.slice(0, -1));
  };

  const handleSubmit = () => {
    if (selectedIndex === null || draftValue.length === 0) {
      return;
    }

    const normalizedValue = normalizeSubjectiveAnswer(draftValue);

    setSubjectiveAnswers((prevAnswers) => ({
      ...prevAnswers,
      [selectedIndex]: normalizedValue,
    }));
    setDraftValue(normalizedValue);
    onSubmitAnswer?.(selectedIndex, normalizedValue);
  };

  return (
    <div className="flex items-end gap-9">
      <OmrCard
        answers={answers}
        className={cn("min-w-[408px] shrink-0", className)}
        onToggleAnswer={onToggleAnswer}
      >
        <OmrCard.SectionHeader title="주   관   식   답   안" />
        <OmrCard.SectionBody className="w-full">
          <OmrCard.Group className="w-full flex-col">
            {Array.from({ length: 12 }).map((_, index) => (
              <SubjectiveAnswerRow
                key={index}
                index={index}
                isTargetQuestion={index === targetQuestionIndex}
                value={subjectiveAnswers[index]}
                isSelected={selectedIndex === index}
                onSelect={() => handleSelectRow(index)}
              />
            ))}
          </OmrCard.Group>
        </OmrCard.SectionBody>
        <OmrCard.Footer className="flex h-[26px] w-full items-center justify-center">
          <span className="text-gs2 pt-px text-[17px] leading-[20px] font-semibold">
            주관식 입력 부분입니다.
          </span>
        </OmrCard.Footer>
      </OmrCard>
      <SubjectiveAnswerInputPad
        selectedIndex={selectedIndex}
        draftValue={draftValue}
        onAppendValue={handleAppendValue}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
