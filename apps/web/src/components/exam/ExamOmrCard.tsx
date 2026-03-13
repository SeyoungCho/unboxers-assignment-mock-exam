import { OmrCard } from "@/components/shared/omr-card/OmrCard";
import { cn } from "@/lib/utils";
import logoOmrCard from "@/assets/images/logo-omr.png";
import { useExamSubmissionStore } from "@/stores/examSubmissionStore";
import type { ExamResponseDto } from "@/types";

type ExamOmrCardProps = {
  examInfo?: ExamResponseDto["data"];
  readOnly?: boolean;
};

const MOCK_EXAM_INFO: ExamResponseDto["data"] = {
  title: "모의고사 응시 테스트",
  description: "모의고사 웹앱 과제용으로 구성한 시험입니다.",
  supervisorName: "배이수",
  totalQuestions: 20,
  totalScore: Array.from({ length: 12 })
    .map(() => 2.5)
    .concat(Array.from({ length: 10 }).map(() => 3))
    .reduce((acc, curr) => acc + curr, 0),
  questions: Array.from({ length: 12 })
    .map((_, index) => ({
      answerType: "objective",
      number: index + 1,
      score: 2.5,
    }))
    .concat(
      Array.from({ length: 10 }).map((_, index) => ({
        answerType: "subjective",
        number: index + 11,
        score: 3,
      })),
    ) as ExamResponseDto["data"]["questions"],
};

function toDigits(
  value: number | null | undefined,
): [number | null, number | null] {
  if (value == null || !Number.isInteger(value) || value < 0 || value > 99) {
    return [null, null];
  }

  return [Math.floor(value / 10), value % 10];
}

function fromDigits(tens: number | null, ones: number | null) {
  if (tens == null && ones == null) {
    return null;
  }

  return (tens ?? 0) * 10 + (ones ?? 0);
}

function QuestionNumberColumn({
  labels,
  withLeftBorder = false,
}: {
  labels: number[];
  withLeftBorder?: boolean;
}) {
  return (
    <OmrCard.IndexColumn
      className="h-full justify-start"
      withLeftBorder={withLeftBorder}
    >
      {labels.map((label) => (
        <OmrCard.IndexCell key={label}>{label}</OmrCard.IndexCell>
      ))}
    </OmrCard.IndexColumn>
  );
}

function ObjectiveAnswerGroup({
  questions,
  displayStartNumber,
  withLeftBorder,
}: {
  questions: ExamResponseDto["data"]["questions"];
  displayStartNumber: number;
  withLeftBorder: boolean;
}) {
  const topQuestions = questions.slice(0, 5);
  const bottomQuestions = questions.slice(5);
  const labels = questions.map((_, index) => displayStartNumber + index);

  return (
    <OmrCard.Group className="h-full">
      <QuestionNumberColumn labels={labels} withLeftBorder={withLeftBorder} />
      <OmrCard.AnswerColumn className="h-full">
        <OmrCard.AnswerSection
          className="pt-3 pb-1.5"
          tinted={displayStartNumber % 20 === 1}
        >
          {topQuestions.map((question) => (
            <OmrCard.BubbleRow key={`objective-${question.number}`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <OmrCard.Bubble
                  key={index + 1}
                  answer={index + 1}
                  questionNumber={question.number}
                />
              ))}
            </OmrCard.BubbleRow>
          ))}
        </OmrCard.AnswerSection>

        {bottomQuestions.length > 0 ? <OmrCard.Divider /> : null}

        {bottomQuestions.length > 0 ? (
          <OmrCard.AnswerSection
            className="pt-1.5 pb-3"
            tinted={displayStartNumber % 20 !== 1}
          >
            {bottomQuestions.map((question) => (
              <OmrCard.BubbleRow key={`objective-${question.number}`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <OmrCard.Bubble
                    key={index + 1}
                    answer={index + 1}
                    questionNumber={question.number}
                  />
                ))}
              </OmrCard.BubbleRow>
            ))}
          </OmrCard.AnswerSection>
        ) : null}
      </OmrCard.AnswerColumn>
    </OmrCard.Group>
  );
}

function SubjectiveAnswerRow({
  displayNumber,
  questionNumber,
  value,
  isSelected,
  onSelect,
  disabled = false,
}: {
  displayNumber: number;
  questionNumber: number;
  value?: string;
  isSelected: boolean;
  onSelect: (questionNumber: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="border-inbrain-light-blue flex h-12 w-full border-t-[1.5px] border-r-[1.5px] border-l-[1.5px] last:border-b-[1.5px]">
      <div className="bg-inbrain-light-blue/20 border-inbrain-light-blue text-inbrain-blue flex w-7 items-center justify-center border-r-[1.5px] text-sm font-semibold">
        {displayNumber}
      </div>
      <button
        type="button"
        className={cn(
          "text-gs1 placeholder:text-gs4 flex flex-1 items-center justify-center px-3 text-center text-[17px] font-semibold",
          isSelected &&
            "outline-inbrain-light-blue bg-white outline-2 -outline-offset-2",
          disabled && "cursor-default",
        )}
        disabled={disabled}
        onClick={() => onSelect(questionNumber)}
      >
        {value ?? "터치해서 주관식 답안 입력"}
      </button>
    </div>
  );
}

function ExamOmrCard({
  examInfo = MOCK_EXAM_INFO,
  readOnly = false,
}: ExamOmrCardProps) {
  const name = useExamSubmissionStore((state) => state.name);
  const school = useExamSubmissionStore((state) => state.school);
  const currentGrade = useExamSubmissionStore((state) => state.grade);
  const currentStudentNumber = useExamSubmissionStore(
    (state) => state.studentNumber,
  );
  const currentSeatNumber = useExamSubmissionStore((state) => state.seatNumber);
  const answers = useExamSubmissionStore((state) => state.objectiveAnswers);
  const subjectiveAnswers = useExamSubmissionStore(
    (state) => state.subjectiveAnswers,
  );
  const currentSelectedSubjectiveQuestionNumber = useExamSubmissionStore(
    (state) => state.selectedSubjectiveQuestionNumber,
  );
  const setGrade = useExamSubmissionStore((state) => state.setGrade);
  const setStudentNumber = useExamSubmissionStore(
    (state) => state.setStudentNumber,
  );
  const toggleObjectiveAnswer = useExamSubmissionStore(
    (state) => state.toggleObjectiveAnswer,
  );
  const selectSubjectiveQuestion = useExamSubmissionStore(
    (state) => state.selectSubjectiveQuestion,
  );

  const objectiveQuestions = examInfo.questions.filter(
    (question) => question.answerType === "objective",
  );
  const subjectiveQuestions = examInfo.questions.filter(
    (question) => question.answerType === "subjective",
  );
  const objectiveGroups = Array.from(
    { length: Math.ceil(objectiveQuestions.length / 10) },
    (_, index) => objectiveQuestions.slice(index * 10, index * 10 + 10),
  );
  const [studentTens, studentOnes] = toDigits(currentStudentNumber);

  const handleGradeSelect = (nextGrade: 1 | 2 | 3) => {
    if (readOnly) {
      return;
    }

    setGrade(nextGrade);
  };

  const handleStudentDigitSelect = (
    position: "tens" | "ones",
    nextDigit: number,
  ) => {
    if (readOnly) {
      return;
    }

    const nextStudentNumber = fromDigits(
      position === "tens" ? nextDigit : studentTens,
      position === "ones" ? nextDigit : studentOnes,
    );
    setStudentNumber(nextStudentNumber);
  };

  const handleSelectSubjectiveQuestion = (questionNumber: number) => {
    if (readOnly) {
      return;
    }

    selectSubjectiveQuestion(questionNumber);
  };

  return (
    <OmrCard
      answers={answers}
      onToggleAnswer={readOnly ? undefined : toggleObjectiveAnswer}
    >
      <OmrCard.Body>
        <div className="flex flex-col">
          <div className="border-inbrain-light-blue flex flex-col border-t border-b border-l">
            <div className="flex">
              <OmrCard.SectionHeader className="w-7">
                <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
                  시험
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
              <OmrCard.SectionHeader className="w-[172px]">
                <OmrCard.SectionHeaderTitle className="text-[17px]">
                  {examInfo.title}
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
            </div>
            <div className="flex">
              <OmrCard.SectionHeader className="w-7">
                <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
                  과목
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
              <OmrCard.SectionHeader className="w-[172px]">
                <OmrCard.SectionHeaderTitle className="text-[17px]">
                  공통수학2
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
            </div>
            <div className="flex">
              <OmrCard.SectionHeader className="w-7">
                <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
                  성명
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
              <OmrCard.SectionHeader className="w-[172px]">
                <OmrCard.SectionHeaderTitle className="text-[17px]">
                  {name}
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
            </div>
            <div className="flex">
              <OmrCard.SectionHeader className="w-7">
                <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
                  학교
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
              <OmrCard.SectionHeader className="w-[172px]">
                <OmrCard.SectionHeaderTitle className="text-[17px]">
                  {school}
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
            </div>
            <div className="flex">
              <OmrCard.SectionHeader className="w-7">
                <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
                  좌석
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
              <OmrCard.SectionHeader className="w-[172px]">
                <OmrCard.SectionHeaderTitle className="text-[17px]">
                  {currentSeatNumber != null
                    ? `${String(currentSeatNumber).padStart(2, "0")}번`
                    : "-"}
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
            </div>
            <div className="flex">
              <OmrCard.SectionHeader className="w-7">
                <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
                  감독
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
              <OmrCard.SectionHeader className="w-[172px]">
                <OmrCard.SectionHeaderTitle className="text-[17px]">
                  {examInfo.supervisorName}
                </OmrCard.SectionHeaderTitle>
              </OmrCard.SectionHeader>
            </div>
          </div>
          <div className="flex h-full w-[200px] flex-col items-center justify-center gap-4">
            <img src={logoOmrCard} alt="logo omr card" className="h-20" />
            <h1 className="text-inbrain-blue text-center text-2xl font-bold">
              학생답안 입력용 <br />
              MR카드
            </h1>
            <p className="text-inbrain-blue text-center text-[12px] leading-tight font-semibold">
              객관식 답안은 터치해서 칠하고, 주관식 <br />
              답안은 터치한 뒤 키패드로 입력해요.
              <br />
              <br />
              답안을 작성하지 않고 제출하면 별도의 경고 없이 오답으로 처리되니
              주의하세요.
            </p>
          </div>
        </div>

        <div className="border-inbrain-light-blue flex flex-col self-stretch border-t">
          <OmrCard.SectionHeader>
            <OmrCard.SectionHeaderTitle className="w-1/2 text-[14px] leading-tight font-semibold">
              학년
            </OmrCard.SectionHeaderTitle>
          </OmrCard.SectionHeader>
          <OmrCard.SectionBody className="border-inbrain-light-blue h-full items-start border-b border-l-2">
            <OmrCard.AnswerColumn className="h-full">
              <OmrCard.AnswerSection className="py-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <OmrCard.MarkerBubble
                    key={index}
                    disabled={readOnly}
                    pressed={currentGrade === index + 1}
                    value={index + 1}
                    onClick={() => handleGradeSelect((index + 1) as 1 | 2 | 3)}
                  />
                ))}
              </OmrCard.AnswerSection>
            </OmrCard.AnswerColumn>
          </OmrCard.SectionBody>
        </div>
        <div className="border-inbrain-light-blue flex flex-col self-stretch border-t">
          <OmrCard.SectionHeader>
            <OmrCard.SectionHeaderTitle className="text-[17px] leading-tight font-semibold">
              번호
            </OmrCard.SectionHeaderTitle>
          </OmrCard.SectionHeader>
          <OmrCard.SectionBody className="border-inbrain-light-blue h-full items-start border-b border-l-2">
            <OmrCard.AnswerColumn className="h-full">
              <OmrCard.AnswerSection className="py-3">
                {Array.from({ length: 10 }).map((_, index) => (
                  <OmrCard.MarkerBubble
                    key={index}
                    disabled={readOnly}
                    pressed={studentTens === index}
                    value={index}
                    onClick={() => handleStudentDigitSelect("tens", index)}
                  />
                ))}
              </OmrCard.AnswerSection>
            </OmrCard.AnswerColumn>
            <OmrCard.AnswerColumn className="h-full">
              <OmrCard.AnswerSection className="py-3">
                {Array.from({ length: 10 }).map((_, index) => (
                  <OmrCard.MarkerBubble
                    key={index}
                    disabled={readOnly}
                    pressed={studentOnes === index}
                    value={index}
                    onClick={() => handleStudentDigitSelect("ones", index)}
                  />
                ))}
              </OmrCard.AnswerSection>
            </OmrCard.AnswerColumn>
          </OmrCard.SectionBody>
        </div>
        <div className="border-inbrain-light-blue flex flex-col self-stretch border-t">
          <OmrCard.SectionHeader>
            <OmrCard.SectionHeaderTitle className="text-[17px] leading-tight font-semibold">
              객관식 답안
            </OmrCard.SectionHeaderTitle>
          </OmrCard.SectionHeader>
          <OmrCard.SectionBody className="border-inbrain-light-blue h-full items-start border-b">
            {objectiveGroups.map((group, index) => (
              <ObjectiveAnswerGroup
                key={`objective-group-${index}`}
                questions={group}
                displayStartNumber={index * 10 + 1}
                withLeftBorder={index === 0}
              />
            ))}
          </OmrCard.SectionBody>
        </div>
        <div className="border-inbrain-light-blue flex flex-col self-stretch border-t">
          <OmrCard.SectionHeader>
            <OmrCard.SectionHeaderTitle className="text-[17px] leading-tight font-semibold">
              주관식 답안
            </OmrCard.SectionHeaderTitle>
          </OmrCard.SectionHeader>
          <OmrCard.SectionBody className="border-inbrain-light-blue h-full w-[255px] items-start border-b">
            <OmrCard.Group className="h-full w-full flex-col">
              {subjectiveQuestions.map((question, index) => (
                <SubjectiveAnswerRow
                  key={`subjective-${question.number}`}
                  displayNumber={objectiveQuestions.length + index + 1}
                  questionNumber={question.number}
                  value={subjectiveAnswers[question.number]}
                  isSelected={
                    currentSelectedSubjectiveQuestionNumber === question.number
                  }
                  disabled={readOnly}
                  onSelect={handleSelectSubjectiveQuestion}
                />
              ))}
            </OmrCard.Group>
          </OmrCard.SectionBody>
        </div>
      </OmrCard.Body>
      <OmrCard.Footer>
        <OmrCard.FooterMarkerContainer>
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
          <OmrCard.FooterMarker />
        </OmrCard.FooterMarkerContainer>
      </OmrCard.Footer>
    </OmrCard>
  );
}

export default ExamOmrCard;
