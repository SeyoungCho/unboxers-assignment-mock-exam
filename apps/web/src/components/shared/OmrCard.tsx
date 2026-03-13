import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Button } from "../ui/button";

export type OmrAnswerMap = Partial<Record<number, number[]>>;

export type OmrQuestionGroupConfig = {
  start: number;
  end: number;
  dividerAfter?: number;
  tintTop?: boolean;
  tintBottom?: boolean;
};

type OmrCardContextValue = {
  answers: OmrAnswerMap;
  onToggleAnswer?: (questionNumber: number, answer: number) => void;
};

type OmrCardRootProps = ComponentProps<"div"> & {
  answers?: OmrAnswerMap;
  onToggleAnswer?: (questionNumber: number, answer: number) => void;
};

type OmrCardContainerProps = ComponentProps<"div">;
type OmrCardHeaderProps = ComponentProps<"div"> & {
  title?: ReactNode;
};
type OmrCardIndexColumnProps = ComponentProps<"div"> & {
  withLeftBorder?: boolean;
};
type OmrCardAnswerSectionProps = ComponentProps<"div"> & {
  tinted?: boolean;
};
type OmrCardBubbleProps = Omit<ComponentProps<"button">, "children"> & {
  questionNumber: number;
  answer: number;
  children?: ReactNode;
};
type OmrCardFooterProps = ComponentProps<"div"> & {
  children?: ReactNode;
};
type ObjectiveAnswerSectionProps = {
  answers?: OmrAnswerMap;
  onToggleAnswer?: (questionNumber: number, answer: number) => void;
  groups?: OmrQuestionGroupConfig[];
  className?: string;
};

const DEFAULT_ANSWER_OPTIONS = [1, 2, 3, 4, 5] as const;

export const DEFAULT_OBJECTIVE_ANSWER_GROUPS: OmrQuestionGroupConfig[] = [
  { start: 1, end: 10, dividerAfter: 5, tintBottom: true },
  { start: 11, end: 20, dividerAfter: 5, tintTop: true },
  { start: 21, end: 30, dividerAfter: 5, tintBottom: true },
];

const omrCardContext = createContext<OmrCardContextValue | null>(null);

function useOmrCardContext() {
  const context = useContext(omrCardContext);

  if (!context) {
    throw new Error("OmrCard compound components must be used within OmrCard.");
  }

  return context;
}

export function OmrCardContainer({
  className,
  children,
  ...props
}: OmrCardContainerProps) {
  return (
    <div
      data-slot="omr-card-container"
      className={cn(
        "bg-omr-card inline-flex flex-col items-center justify-center rounded-[32px] px-6 pt-4 pb-1 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardRoot({
  className,
  children,
  answers = {},
  onToggleAnswer,
  ...props
}: OmrCardRootProps) {
  return (
    <omrCardContext.Provider value={{ answers, onToggleAnswer }}>
      <OmrCardContainer className={className} {...props}>
        {children}
      </OmrCardContainer>
    </omrCardContext.Provider>
  );
}

function OmrCardHeader({
  className,
  title = "객   관   식   답   안",
  ...props
}: OmrCardHeaderProps) {
  return (
    <div
      data-slot="omr-card-header"
      className={cn(
        "border-inbrain-light-blue flex h-10 items-center justify-center self-stretch border-[1.5px] py-1.5",
        className,
      )}
      {...props}
    >
      <div
        data-slot="omr-card-header-title"
        className="text-inbrain-blue text-center text-2xl font-semibold"
      >
        {title}
      </div>
    </div>
  );
}

function OmrCardBody({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-body"
      className={cn("inline-flex items-center justify-start", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardGroup({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-group"
      className={cn("flex h-[572px] items-center justify-start", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardIndexColumn({
  className,
  children,
  withLeftBorder = false,
  ...props
}: OmrCardIndexColumnProps) {
  return (
    <div
      data-slot="omr-card-index-column"
      className={cn(
        "border-inbrain-light-blue inline-flex w-7 flex-col items-center justify-center gap-3 border-r-[1.5px] border-b-[1.5px] bg-blue-500/20 py-3",
        withLeftBorder && "border-l-[1.5px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardIndexCell({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-index-cell"
      className={cn(
        "inline-flex h-11 w-5 items-center justify-center gap-2.5 rounded-[20px] px-2 py-2.5",
        className,
      )}
      {...props}
    >
      <div
        data-slot="omr-card-index-text"
        className="text-inbrain-blue text-center text-sm font-semibold"
      >
        {children}
      </div>
    </div>
  );
}

function OmrCardAnswerColumn({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-answer-column"
      className={cn(
        "border-inbrain-light-blue inline-flex flex-col items-start justify-start border-r-[1.5px] border-b-[1.5px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardAnswerSection({
  className,
  children,
  tinted = false,
  ...props
}: OmrCardAnswerSectionProps) {
  return (
    <div
      data-slot="omr-card-answer-section"
      className={cn(
        "flex flex-col items-center justify-end gap-3 px-2 pb-3",
        tinted && "bg-blue-500/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardDivider({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-divider"
      className={cn("relative h-0 shrink-0 self-stretch", className)}
      {...props}
    >
      <div data-slot="omr-card-divider-line" className="dotted-line h-px" />
    </div>
  );
}

function OmrCardBubbleRow({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-bubble-row"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function OmrCardBubble({
  className,
  children,
  questionNumber,
  answer,
  onClick,
  ...props
}: OmrCardBubbleProps) {
  const { answers, onToggleAnswer } = useOmrCardContext();
  const isSelected = answers[questionNumber]?.includes(answer) ?? false;

  const handleClick: ComponentProps<"button">["onClick"] = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onToggleAnswer?.(questionNumber, answer);
  };

  return (
    <button
      aria-pressed={isSelected}
      data-slot="omr-card-bubble"
      className={cn(
        "flex h-11 w-5 items-center justify-center gap-2.5 rounded-[20px] px-2 py-2.5 text-xs leading-4 font-bold text-white transition-colors",
        isSelected ? "bg-marking-marked" : "bg-marking-unmarked",
        onToggleAnswer ? "cursor-pointer" : "cursor-default",
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children ?? answer}
    </button>
  );
}

function OmrCardFooter({ className, children, ...props }: OmrCardFooterProps) {
  return (
    <div data-slot="omr-card-footer" className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export const OmrCard = Object.assign(OmrCardRoot, {
  Header: OmrCardHeader,
  Body: OmrCardBody,
  Group: OmrCardGroup,
  IndexColumn: OmrCardIndexColumn,
  IndexCell: OmrCardIndexCell,
  AnswerColumn: OmrCardAnswerColumn,
  AnswerSection: OmrCardAnswerSection,
  Divider: OmrCardDivider,
  BubbleRow: OmrCardBubbleRow,
  Bubble: OmrCardBubble,
  Footer: OmrCardFooter,
  FooterMarker: OmrCardFooterMarker,
  FooterMarkerContainer: OmrCardFooterMarkerContainer,
});

export function ObjectiveAnswerSection({
  answers = {},
  onToggleAnswer,
  groups = DEFAULT_OBJECTIVE_ANSWER_GROUPS,
  className,
}: ObjectiveAnswerSectionProps) {
  return (
    <OmrCard
      answers={answers}
      className={className}
      onToggleAnswer={onToggleAnswer}
    >
      <OmrCard.Header />
      <OmrCard.Body>
        {groups.map((group, index) => (
          <ObjectiveAnswerGroup
            key={group.start}
            config={group}
            withLeftBorder={index === 0}
          />
        ))}
      </OmrCard.Body>
      <OmrCard.Footer className="flex w-full">
        <OmrCard.FooterMarkerContainer className="w-[170px]">
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
        </OmrCard.FooterMarkerContainer>
        <OmrCard.FooterMarkerContainer className="w-[184px]">
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
        </OmrCard.FooterMarkerContainer>
        <OmrCard.FooterMarkerContainer className="w-[184px]">
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
        </OmrCard.FooterMarkerContainer>
      </OmrCard.Footer>
    </OmrCard>
  );
}

type SubjectiveAnswerSectionProps = {
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

export function SubjectiveAnswerSection({
  answers = {},
  onToggleAnswer,
  className,
  targetQuestionIndex,
  onSelectQuestion,
  onSubmitAnswer,
}: SubjectiveAnswerSectionProps) {
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

type ObjectiveAnswerGroupProps = {
  config: OmrQuestionGroupConfig;
  withLeftBorder: boolean;
};

function ObjectiveAnswerGroup({
  config,
  withLeftBorder,
}: ObjectiveAnswerGroupProps) {
  const questionNumbers = Array.from(
    { length: config.end - config.start + 1 },
    (_, index) => config.start + index,
  );

  const dividerIndex = config.dividerAfter ?? questionNumbers.length;
  const topQuestions = questionNumbers.slice(0, dividerIndex);
  const bottomQuestions = questionNumbers.slice(dividerIndex);

  return (
    <OmrCard.Group>
      <OmrCard.IndexColumn withLeftBorder={withLeftBorder}>
        {questionNumbers.map((questionNumber) => (
          <OmrCard.IndexCell key={questionNumber}>
            {questionNumber}
          </OmrCard.IndexCell>
        ))}
      </OmrCard.IndexColumn>

      <OmrCard.AnswerColumn>
        <OmrCard.AnswerSection className="pt-3 pb-1.5" tinted={config.tintTop}>
          {topQuestions.map((questionNumber) => (
            <ObjectiveAnswerRow
              key={questionNumber}
              questionNumber={questionNumber}
            />
          ))}
        </OmrCard.AnswerSection>

        {bottomQuestions.length > 0 ? <OmrCard.Divider /> : null}

        {bottomQuestions.length > 0 ? (
          <OmrCard.AnswerSection
            className="pt-1.5 pb-3"
            tinted={config.tintBottom}
          >
            {bottomQuestions.map((questionNumber) => (
              <ObjectiveAnswerRow
                key={questionNumber}
                questionNumber={questionNumber}
              />
            ))}
          </OmrCard.AnswerSection>
        ) : null}
      </OmrCard.AnswerColumn>
    </OmrCard.Group>
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
      <g clip-path="url(#clip0_308_1537)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
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

function ObjectiveAnswerRow({ questionNumber }: { questionNumber: number }) {
  return (
    <OmrCard.BubbleRow>
      {DEFAULT_ANSWER_OPTIONS.map((answer) => (
        <OmrCard.Bubble
          key={answer}
          answer={answer}
          questionNumber={questionNumber}
        />
      ))}
    </OmrCard.BubbleRow>
  );
}

function OmrCardFooterMarker({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-footer-marker"
      className={cn("bg-marking-marked h-6 w-2", className)}
      {...props}
    />
  );
}

function OmrCardFooterMarkerContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="omr-card-footer-marker-container"
      className={cn("flex justify-end gap-5.5 pt-0.5", className)}
      {...props}
    />
  );
}
