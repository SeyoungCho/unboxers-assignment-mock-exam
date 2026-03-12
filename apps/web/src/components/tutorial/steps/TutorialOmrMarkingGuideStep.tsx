import TutorialPanel from "@/components/tutorial/TutorialPanel";
import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";

import omrMarkingGuideImage from "@/assets/images/tutorial-sample-omr-card.png";
import examCover from "@/assets/images/tutorial-exam-cover.png";

function TutorialOmrMarkingGuideStep({ controls }: TutorialStepComponentProps) {
  return (
    <TutorialStepLayout
      content={<OmrMarkingGuideImage />}
      description={
        <>
          실제 시험지 크기에 인쇄된 시험지에 문제를 풀고
          <br />
          화면에 표시된 OMR카드에 답을 마킹해요
        </>
      }
      panel={
        <TutorialPanel
          variant="middle"
          onNext={controls.goNext}
          onPrevious={controls.goPrevious}
          onSkip={controls.skipTutorial}
        />
      }
    />
  );
}

function OmrMarkingGuideImage() {
  return (
    <div className="flex items-center gap-12">
      <img src={examCover} alt="exam cover" className="w-[315px]" />
      <img
        src={omrMarkingGuideImage}
        alt="omr marking guide"
        className="w-[593px]"
      />
    </div>
  );
}

export default TutorialOmrMarkingGuideStep;
