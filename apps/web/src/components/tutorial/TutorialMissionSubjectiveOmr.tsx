import { SubjectiveAnswerTutorialOmrCard } from "@/components/shared/omr-card/SubjectiveAnswerTutorialOmrCard";

type TutorialMissionSubjectiveOmrProps = {
  targetQuestionIndex: number;
  onSelectQuestion?: (index: number) => void;
  onSubmitAnswer?: (index: number, value: string) => void;
};

function TutorialMissionSubjectiveOmr({
  targetQuestionIndex,
  onSelectQuestion,
  onSubmitAnswer,
}: TutorialMissionSubjectiveOmrProps) {
  return (
    <SubjectiveAnswerTutorialOmrCard
      targetQuestionIndex={targetQuestionIndex}
      onSelectQuestion={onSelectQuestion}
      onSubmitAnswer={onSubmitAnswer}
    />
  );
}

export default TutorialMissionSubjectiveOmr;
