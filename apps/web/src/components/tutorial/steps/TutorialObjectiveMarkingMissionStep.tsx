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
        <TutorialMissionOmr
          answers={controls.objectiveAnswers}
          onToggleAnswer={controls.toggleObjectiveAnswer}
        />
      }
      description={
        <>
          객관식 답안은 화면을 터치해서 마킹해요
          <br />
          <span className="font-bold text-[#3568ff]">
            15번 문제에 3번으로 답안을 마킹
          </span>
          해보세요
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
