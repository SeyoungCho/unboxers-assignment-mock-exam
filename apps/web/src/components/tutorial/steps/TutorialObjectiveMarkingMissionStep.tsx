import TutorialMissionObjectiveOmr from "@/components/tutorial/TutorialMissionObjectiveOmr";
import TutorialPanel from "@/components/tutorial/TutorialPanel";
import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import {
  useTutorialSubsteps,
  type TutorialSubstepConfig,
} from "@/hooks/tutorial/useTutorialSubsteps";
import type { OmrAnswerMap } from "@/components/shared/omr-card/OmrCard";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";
import { useState } from "react";

const TARGET_QUESTION_NUMBER = 15;
const TARGET_ANSWER = 3;

function isMarkedOnlyTargetAnswer(answers: number[]) {
  return answers.length === 1 && answers[0] === TARGET_ANSWER;
}

const OBJECTIVE_MISSION_SUBSTEPS = [
  {
    description: (
      <>
        객관식 답안은 화면을 터치해서 마킹해요
        <br />
        <span className="text-inbrain-light-blue font-bold">15번 문제</span>
        에&nbsp;
        <span className="text-inbrain-light-blue font-bold">3번</span>으로
        답안을 마킹 해보세요
      </>
    ),
    isComplete: isMarkedOnlyTargetAnswer,
  },
  {
    description: (
      <>
        마킹한 곳을 한 번 더 터치하면 지울 수 있어요
        <br />
        <span className="text-inbrain-light-blue font-bold">15번 문제</span>
        에&nbsp;
        <span className="text-inbrain-light-blue font-bold">3번</span> 답안을
        지워보세요
      </>
    ),
    isComplete: (answers) => answers.length === 0,
  },
  {
    description: (
      <>
        2개 이상의 답안을 골라야 하는 문제에서는
        <br />두 답안 모두 마킹하면 돼요
      </>
    ),
  },
] satisfies readonly TutorialSubstepConfig<number[]>[];

function TutorialObjectiveMarkingMissionStep({
  controls,
}: TutorialStepComponentProps) {
  const [objectiveAnswers, setObjectiveAnswers] = useState<OmrAnswerMap>({});
  const answersForTarget = objectiveAnswers[TARGET_QUESTION_NUMBER] ?? [];
  const { currentDescription, isMissionComplete, syncSubstepProgress } =
    useTutorialSubsteps({
      substeps: OBJECTIVE_MISSION_SUBSTEPS,
      context: answersForTarget,
    });
  const handleToggleObjectiveAnswer = (
    questionNumber: number,
    answer: number,
  ) => {
    setObjectiveAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionNumber] ?? [];
      const hasAnswer = currentAnswers.includes(answer);
      let nextQuestionAnswers: number[];
      const nextAnswers: OmrAnswerMap = { ...prevAnswers };

      if (hasAnswer) {
        nextQuestionAnswers = currentAnswers.filter(
          (currentAnswer) => currentAnswer !== answer,
        );

        if (nextQuestionAnswers.length === 0) {
          delete nextAnswers[questionNumber];
        } else {
          nextAnswers[questionNumber] = nextQuestionAnswers;
        }
      } else {
        nextQuestionAnswers = [...currentAnswers, answer];
        nextAnswers[questionNumber] = nextQuestionAnswers;
      }

      if (questionNumber === TARGET_QUESTION_NUMBER) {
        syncSubstepProgress(nextQuestionAnswers);
      }

      return nextAnswers;
    });
  };

  return (
    <TutorialStepLayout
      content={
        <div className="flex h-[400px] w-[600px] flex-col justify-end">
          <TutorialMissionObjectiveOmr
            answers={objectiveAnswers}
            onToggleAnswer={handleToggleObjectiveAnswer}
          />
        </div>
      }
      description={currentDescription}
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
