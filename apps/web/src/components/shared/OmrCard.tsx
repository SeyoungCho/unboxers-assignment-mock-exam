import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";

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
  markerCount?: number;
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

function OmrCardFooter({
  className,
  markerCount = 15,
  ...props
}: OmrCardFooterProps) {
  return (
    <div
      data-slot="omr-card-footer"
      className={cn("flex items-center justify-between gap-8 px-8", className)}
      {...props}
    >
      {Array.from({ length: markerCount }).map((_, index) => (
        <div
          key={index}
          data-slot="omr-card-footer-marker"
          className="bg-marking-marked h-6 w-2"
        />
      ))}
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
      <OmrCard.Footer />
    </OmrCard>
  );
}

export function SampleOmrCard() {
  return <ObjectiveAnswerSection answers={{ 15: [3], 16: [2, 4] }} />;
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
