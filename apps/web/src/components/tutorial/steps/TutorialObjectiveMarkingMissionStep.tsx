import TutorialMissionOmr from "@/components/tutorial/TutorialMissionOmr";
import TutorialPanel from "@/components/tutorial/TutorialPanel";
import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { OmrAnswerMap } from "@/components/shared/OmrCard";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";
import { useState } from "react";

const TARGET_QUESTION_NUMBER = 15;
const TARGET_ANSWER = 3;

function TutorialObjectiveMarkingMissionStep({
  controls,
}: TutorialStepComponentProps) {
  const [objectiveAnswers, setObjectiveAnswers] = useState<OmrAnswerMap>({
    16: [2],
  });

  const isMissionComplete =
    objectiveAnswers[TARGET_QUESTION_NUMBER]?.includes(TARGET_ANSWER) ?? false;

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

  return (
    <TutorialStepLayout
      content={
        <div className="flex h-[400px] w-[600px] flex-col justify-end">
          <TutorialMissionOmr
            answers={objectiveAnswers}
            onToggleAnswer={handleToggleObjectiveAnswer}
          />
        </div>
      }
      description={
        <>
          객관식 답안은 화면을 터치해서 마킹해요
          <br />
          <span className="text-inbrain-light-blue font-bold">15번 문제</span>
          에&nbsp;
          <span className="text-inbrain-light-blue font-bold">3번</span>으로
          답안을 마킹 해보세요
        </>
      }
      panel={
        <TutorialPanel
          variant="middle"
          isNextDisabled={!isMissionComplete}
          onNext={controls.goNext}
          onPrevious={controls.goPrevious}
          onSkip={controls.skipTutorial}
        />
      }
      showMissionHint
      isMissionComplete={isMissionComplete}
    />
  );
}

export default TutorialObjectiveMarkingMissionStep;
