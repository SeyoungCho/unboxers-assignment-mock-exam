import {
  SubjectiveAnswerSection,
} from "@/components/shared/OmrCard";

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
    <SubjectiveAnswerSection
      targetQuestionIndex={targetQuestionIndex}
      onSelectQuestion={onSelectQuestion}
      onSubmitAnswer={onSubmitAnswer}
    />
  );
}

export default TutorialMissionSubjectiveOmr;
