import {
  TUTORIAL_STEP_SEQUENCE,
  tutorialStepComponentMap,
} from "@/components/tutorial/steps/tutorialStepRegistry";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TutorialPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [objectiveAnswers, setObjectiveAnswers] = useState<
    Partial<Record<number, number[]>>
  >({
    16: [2],
  });

  const isObjectiveMissionComplete = objectiveAnswers[15]?.includes(3) ?? false;

  const handlePrevious = () => {
    setCurrentStepIndex((prevStepIndex) => Math.max(prevStepIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentStepIndex((prevStepIndex) =>
      Math.min(prevStepIndex + 1, TUTORIAL_STEP_SEQUENCE.length - 1),
    );
  };

  const handleSkip = () => {
    navigate("/exam");
  };

  const handleGoToExam = () => {
    navigate("/exam");
  };

  const handleToggleObjectiveAnswer = (
    questionNumber: number,
    answer: number,
  ) => {
    setObjectiveAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionNumber] ?? [];
      const hasAnswer = currentAnswers.includes(answer);

      if (hasAnswer) {
        const nextQuestionAnswers = currentAnswers.filter(
          (currentAnswer) => currentAnswer !== answer,
        );
        const nextAnswers = { ...prevAnswers };

        if (nextQuestionAnswers.length === 0) {
          delete nextAnswers[questionNumber];
        } else {
          nextAnswers[questionNumber] = nextQuestionAnswers;
        }

        return nextAnswers;
      }

      return {
        ...prevAnswers,
        [questionNumber]: [...currentAnswers, answer],
      };
    });
  };

  const currentStepId = TUTORIAL_STEP_SEQUENCE[currentStepIndex];
  const CurrentStepComponent = tutorialStepComponentMap[currentStepId];

  return (
    <div className="mx-auto h-full max-w-[1200px] py-20">
      <CurrentStepComponent
        controls={{
          goPrevious: handlePrevious,
          goNext: handleNext,
          skipTutorial: handleSkip,
          goToExam: handleGoToExam,
          objectiveAnswers,
          toggleObjectiveAnswer: handleToggleObjectiveAnswer,
          isObjectiveMarkingMissionComplete: isObjectiveMissionComplete,
        }}
      />
    </div>
  );
}

export default TutorialPage;
