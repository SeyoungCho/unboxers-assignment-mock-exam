import type { OmrAnswerMap } from "@/components/shared/omr-card/OmrCard";
import { ObjectiveAnswerTutorialOmrCard } from "@/components/shared/omr-card/ObjectiveAnswerTutorialOmrCard";

type TutorialMissionOmrProps = {
  answers: OmrAnswerMap;
  onToggleAnswer: (questionNumber: number, answer: number) => void;
};

function TutorialMissionObjectiveOmr({
  answers,
  onToggleAnswer,
}: TutorialMissionOmrProps) {
  return (
    <ObjectiveAnswerTutorialOmrCard
      answers={answers}
      onToggleAnswer={onToggleAnswer}
    />
  );
}

export default TutorialMissionObjectiveOmr;
