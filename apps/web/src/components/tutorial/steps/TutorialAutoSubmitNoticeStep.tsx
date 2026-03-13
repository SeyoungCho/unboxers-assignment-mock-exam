import TutorialPanel from "@/components/tutorial/TutorialPanel";

import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";

function TutorialAutoSubmitNoticeStep({
  controls,
}: TutorialStepComponentProps) {
  return (
    <TutorialStepLayout
      content={
        <div className="h-[280px] w-full max-w-[720px] rounded-[28px] bg-blue-100" />
      }
      description={
        <>
          시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요
          <br />
          마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요
        </>
      }
      panel={
        <TutorialPanel
          variant="last"
          onGoToExam={controls.goToExam}
          onPrevious={controls.goPrevious}
        />
      }
    />
  );
}

export default TutorialAutoSubmitNoticeStep;
