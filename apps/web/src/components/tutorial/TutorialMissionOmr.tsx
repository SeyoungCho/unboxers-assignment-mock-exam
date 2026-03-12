import {
  ObjectiveAnswerSection,
  type OmrAnswerMap,
} from "@/components/shared/OmrCard";

type TutorialMissionOmrProps = {
  answers: OmrAnswerMap;
  onToggleAnswer: (questionNumber: number, answer: number) => void;
};

function TutorialMissionOmr({
  answers,
  onToggleAnswer,
}: TutorialMissionOmrProps) {
  return (
    <ObjectiveAnswerSection
      answers={answers}
      onToggleAnswer={onToggleAnswer}
    />
  );
}

export default TutorialMissionOmr;
