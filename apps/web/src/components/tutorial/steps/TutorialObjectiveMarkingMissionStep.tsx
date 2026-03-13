import TutorialMissionOmr from "@/components/tutorial/TutorialMissionOmr";
import TutorialPanel from "@/components/tutorial/TutorialPanel";
import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";

function TutorialObjectiveMarkingMissionStep({
  controls,
}: TutorialStepComponentProps) {
  return (
    <TutorialStepLayout
      content={
        <div className="h-[400px] w-[600px]">
          <div className="-translate-y-1/2">
            <TutorialMissionOmr
              answers={controls.objectiveAnswers}
              onToggleAnswer={controls.toggleObjectiveAnswer}
            />
          </div>
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
          isNextDisabled={!controls.isObjectiveMarkingMissionComplete}
          onNext={controls.goNext}
          onPrevious={controls.goPrevious}
          onSkip={controls.skipTutorial}
        />
      }
      showMissionHint
      isMissionComplete={controls.isObjectiveMarkingMissionComplete}
    />
  );
}

export default TutorialObjectiveMarkingMissionStep;
