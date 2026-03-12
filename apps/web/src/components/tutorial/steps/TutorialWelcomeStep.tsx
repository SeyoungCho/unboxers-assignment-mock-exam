import TutorialPanel from "@/components/tutorial/TutorialPanel";
import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";
import examCover from "@/assets/images/tutorial-exam-cover.png";

function TutorialWelcomeStep({ controls }: TutorialStepComponentProps) {
  return (
    <TutorialStepLayout
      content={<img src={examCover} alt="exam cover" className="w-[315px]" />}
      description={
        <>
          모의고사 모드는 처음이시죠? 실전 모의고사는
          <br />
          실전과 최대한 비슷한 환경으로 진행돼요
        </>
      }
      panel={
        <TutorialPanel
          variant="first"
          onNext={controls.goNext}
          onSkip={controls.skipTutorial}
        />
      }
    />
  );
}

export default TutorialWelcomeStep;
