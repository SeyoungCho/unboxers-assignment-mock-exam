import TutorialPanel from "@/components/tutorial/TutorialPanel";

import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";
import { Button } from "@/components/ui/button";
import { MessageIcon } from "@/components/shared/icons";

function TutorialAutoSubmitNoticeStep({
  controls,
}: TutorialStepComponentProps) {
  return (
    <TutorialStepLayout
      content={<TutorialAutoSubmitNoticeStepContent />}
      description={
        <>
          시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요
          <br />
          <span className="text-red">
            마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요
          </span>
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

function TutorialAutoSubmitNoticeStepContent() {
  return (
    <div className="h-exam-panel flex items-center gap-9 rounded-xl bg-white px-15 py-6">
      <div className="flex w-[632px] flex-col gap-2">
        <span className="text-[17px] font-extrabold">
          시험 종료까지 남은 시간
        </span>
        <div className="flex items-end justify-between">
          <h3 className="text-red text-5xl font-extrabold">5초</h3>
          <span className="text-[17px] font-semibold">시험 시간 60분</span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-[#F5F5F5]">
          <div
            className="bg-red absolute top-0 left-0 h-full rounded-full"
            style={{ width: "20%" }}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="pointer-events-none h-[60px] w-[200px] rounded-2xl font-bold"
        >
          <MessageIcon className="size-6" />
          문제가 생겼나요?
        </Button>
        <Button className="bg-inbrain-gradient pointer-events-none h-[60px] w-[200px] rounded-2xl font-bold">
          답안 제출하기
        </Button>
      </div>
    </div>
  );
}

export default TutorialAutoSubmitNoticeStep;
