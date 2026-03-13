import {
  DEFAULT_OBJECTIVE_ANSWER_GROUPS,
  OmrCard,
  type OmrAnswerMap,
  type OmrQuestionGroupConfig,
} from "./OmrCard";

const DEFAULT_ANSWER_OPTIONS = [1, 2, 3, 4, 5] as const;

type ObjectiveAnswerTutorialOmrCardProps = {
  answers?: OmrAnswerMap;
  onToggleAnswer?: (questionNumber: number, answer: number) => void;
  groups?: OmrQuestionGroupConfig[];
  className?: string;
};

type ObjectiveAnswerGroupProps = {
  config: OmrQuestionGroupConfig;
  withLeftBorder: boolean;
};

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

export function ObjectiveAnswerTutorialOmrCard({
  answers = {},
  onToggleAnswer,
  groups = DEFAULT_OBJECTIVE_ANSWER_GROUPS,
  className,
}: ObjectiveAnswerTutorialOmrCardProps) {
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
