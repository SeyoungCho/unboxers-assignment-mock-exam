import TutorialMissionSubjectiveOmr from "@/components/tutorial/TutorialMissionSubjectiveOmr";
import TutorialPanel from "@/components/tutorial/TutorialPanel";
import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import {
  useTutorialSubsteps,
  type TutorialSubstepConfig,
} from "@/hooks/tutorial/useTutorialSubsteps";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";
import { useState } from "react";

const TARGET_QUESTION_INDEX = 3;

type SubjectiveMissionContext = {
  selectedIndex: number | null;
  targetAnswerValue: string;
};

const SUBJECTIVE_MISSION_SUBSTEPS = [
  {
    description: (
      <>
        주관식 답안을 입력하려면 입력할 곳을 터치해요
        <br />
        <span className="text-inbrain-light-blue font-bold">4번 문제</span>의
        답안을 입력해볼까요?
      </>
    ),
    isComplete: (context) => context.selectedIndex === TARGET_QUESTION_INDEX,
  },
  {
    description: (
      <>
        아무 숫자나 입력하고
        <br />
        <span className="text-inbrain-light-blue font-bold">완료</span> 버튼을
        눌러서 답안을 작성해요
      </>
    ),
    isComplete: (context) => context.targetAnswerValue.length > 0,
  },
  {
    description: (
      <>
        입력한 답안을 수정하려면
        <br />
        해당 문제를 다시 한 번 터치해요
      </>
    ),
  },
] satisfies readonly TutorialSubstepConfig<SubjectiveMissionContext>[];

function TutorialSubjectiveMarkingMissionStep({
  controls,
}: TutorialStepComponentProps) {
  const [missionContext, setMissionContext] = useState<SubjectiveMissionContext>({
    selectedIndex: null,
    targetAnswerValue: "",
  });
  const { currentDescription, isMissionComplete, syncSubstepProgress } =
    useTutorialSubsteps({
      substeps: SUBJECTIVE_MISSION_SUBSTEPS,
      context: missionContext,
    });

  const handleSelectQuestion = (selectedIndex: number) => {
    setMissionContext((prevContext) => {
      const nextContext = {
        ...prevContext,
        selectedIndex,
      };

      syncSubstepProgress(nextContext);

      return nextContext;
    });
  };

  const handleSubmitAnswer = (index: number, value: string) => {
    setMissionContext((prevContext) => {
      const nextContext = {
        ...prevContext,
        targetAnswerValue:
          index === TARGET_QUESTION_INDEX ? value : prevContext.targetAnswerValue,
      };

      syncSubstepProgress(nextContext);

      return nextContext;
    });
  };

  return (
    <TutorialStepLayout
      content={
        <div className="flex h-[400px] w-[687px] flex-col justify-end">
          <TutorialMissionSubjectiveOmr
            targetQuestionIndex={TARGET_QUESTION_INDEX}
            onSelectQuestion={handleSelectQuestion}
            onSubmitAnswer={handleSubmitAnswer}
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

export default TutorialSubjectiveMarkingMissionStep;
