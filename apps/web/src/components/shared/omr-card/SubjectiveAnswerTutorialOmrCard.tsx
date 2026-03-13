import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

type SubjectiveAnswerInputPadProps = {
  selectedIndex: number | null;
  draftValue: string;
  onAppendValue: (nextValue: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
};

const SUBJECTIVE_INPUT_PAD_KEYS = [
  ".",
  "/",
  "-",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;

function SubjectiveAnswerInputPad({
  selectedIndex,
  draftValue,
  onAppendValue,
  onBackspace,
  onSubmit,
}: SubjectiveAnswerInputPadProps) {
  const isRowSelected = selectedIndex !== null;
  const displayText = isRowSelected
    ? draftValue || `${selectedIndex + 1}번 답안을 입력하세요`
    : "입력할 곳을 터치해주세요";

  return (
    <div className="flex w-full flex-col gap-6 [&_button]:h-13 [&_button]:rounded-xl [&_button]:text-[17px] [&_button]:font-bold">
      <div className="grid grid-cols-3 gap-3">
        <div
          className={cn(
            "shadow-btn col-span-3 flex h-13 items-center justify-center rounded-xl bg-white text-[17px] font-bold",
            {
              "outline-inbrain-light-blue outline-2": isRowSelected,
            },
          )}
        >
          <span
            className={cn(
              "text-center",
              {
                "text-gs1": draftValue.length > 0 || selectedIndex === null,
              },
              {
                "text-gs4": !isRowSelected || draftValue.length === 0,
              },
            )}
          >
            {displayText}
          </span>
        </div>

        {SUBJECTIVE_INPUT_PAD_KEYS.map((key) => (
          <Button
            key={key}
            variant="secondary"
            disabled={!isRowSelected}
            onClick={() => onAppendValue(key)}
          >
            {key}
          </Button>
        ))}

        <Button
          variant="secondary"
          className="col-span-2"
          disabled={!isRowSelected}
          onClick={() => onAppendValue("0")}
        >
          0
        </Button>
        <Button
          variant="secondary"
          disabled={!isRowSelected}
          onClick={onBackspace}
        >
          <BackspaceIcon className="size-5" />
        </Button>
      </div>
      <Button
        disabled={!isRowSelected || draftValue.length === 0}
        onClick={onSubmit}
        className="bg-inbrain-gradient"
      >
        완료
      </Button>
    </div>
  );
}

function BackspaceIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_308_1537)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.80253 4.375H15.625C16.1223 4.375 16.5992 4.57255 16.9509 4.92418C17.3025 5.27581 17.5 5.75272 17.5 6.25V13.75C17.5 14.2473 17.3025 14.7242 16.9509 15.0758C16.5992 15.4275 16.1223 15.625 15.625 15.625H6.80253C6.52139 15.6249 6.24387 15.5617 5.9905 15.4398C5.73713 15.318 5.51439 15.1408 5.33878 14.9213L2.24502 11.055C2.00524 10.7557 1.87458 10.3835 1.87458 10C1.87458 9.61645 2.00524 9.24435 2.24502 8.945L5.33878 5.07875C5.51413 4.85954 5.73646 4.68251 5.98937 4.5607C6.24228 4.4389 6.51931 4.37544 6.80003 4.375M3.87127 3.9075C4.2229 3.46794 4.66897 3.11317 5.17641 2.86951C5.68384 2.62586 6.23962 2.49956 6.80253 2.5H15.625C16.6196 2.5 17.5734 2.89509 18.2767 3.59835C18.9799 4.30161 19.375 5.25544 19.375 6.25V13.75C19.375 14.7446 18.9799 15.6984 18.2767 16.4017C17.5734 17.1049 16.6196 17.5 15.625 17.5H6.80253C6.24005 17.5001 5.68476 17.3736 5.17778 17.1299C4.67081 16.8863 4.22514 16.5317 3.87377 16.0925L0.781274 12.2263C0.275544 11.5944 0 10.8093 0 10C0 9.19072 0.275544 8.40555 0.781274 7.77375L3.87127 3.9075ZM9.10003 6.8375C8.92231 6.6719 8.68725 6.58175 8.44437 6.58603C8.2015 6.59032 7.96976 6.68871 7.798 6.86047C7.62623 7.03224 7.52784 7.26397 7.52356 7.50685C7.51927 7.74972 7.60943 7.98478 7.77503 8.1625L9.61253 10L7.77503 11.8375C7.68292 11.9233 7.60904 12.0268 7.5578 12.1418C7.50656 12.2568 7.47901 12.381 7.47679 12.5068C7.47457 12.6327 7.49772 12.7578 7.54487 12.8745C7.59202 12.9912 7.6622 13.0973 7.75123 13.1863C7.84025 13.2753 7.94629 13.3455 8.06303 13.3927C8.17976 13.4398 8.3048 13.463 8.43068 13.4607C8.55656 13.4585 8.6807 13.431 8.7957 13.3797C8.9107 13.3285 9.0142 13.2546 9.10003 13.1625L10.9375 11.325L12.775 13.1625C12.8609 13.2546 12.9644 13.3285 13.0794 13.3797C13.1944 13.431 13.3185 13.4585 13.4444 13.4607C13.5703 13.463 13.6953 13.4398 13.812 13.3927C13.9288 13.3455 14.0348 13.2753 14.1238 13.1863C14.2128 13.0973 14.283 12.9912 14.3302 12.8745C14.3773 12.7578 14.4005 12.6327 14.3983 12.5068C14.396 12.381 14.3685 12.2568 14.3173 12.1418C14.266 12.0268 14.1921 11.9233 14.1 11.8375L12.2625 10L14.1 8.1625C14.2656 7.98478 14.3558 7.74972 14.3515 7.50685C14.3472 7.26397 14.2488 7.03224 14.0771 6.86047C13.9053 6.68871 13.6736 6.59032 13.4307 6.58603C13.1878 6.58175 12.9527 6.6719 12.775 6.8375L10.9375 8.675L9.10003 6.8375Z"
          fill="#090909"
        />
      </g>
      <defs>
        <clipPath id="clip0_308_1537">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
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
        <OmrCard.Header title="주   관   식   답   안" />
        <OmrCard.Body className="w-full">
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
        </OmrCard.Body>
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
