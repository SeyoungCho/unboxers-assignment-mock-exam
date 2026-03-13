import TutorialPanel from "@/components/tutorial/TutorialPanel";

import TutorialStepLayout from "@/components/tutorial/TutorialStepLayout";
import type { TutorialStepComponentProps } from "@/components/tutorial/steps/tutorialStepRegistry";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

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
    <div className="flex h-[161px] items-center gap-9 rounded-xl bg-white px-15 py-6">
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

function MessageIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M18 3C19.0609 3 20.0783 3.42143 20.8284 4.17157C21.5786 4.92172 22 5.93913 22 7V15C22 16.0609 21.5786 17.0783 20.8284 17.8284C20.0783 18.5786 19.0609 19 18 19H13.276L8.514 21.857C8.37059 21.9431 8.20788 21.9918 8.04077 21.9987C7.87366 22.0056 7.70749 21.9705 7.55746 21.8966C7.40743 21.8227 7.27833 21.7123 7.18199 21.5756C7.08565 21.4389 7.02514 21.2802 7.006 21.114L7 21V19H6C4.97376 19 3.98677 18.6056 3.24319 17.8983C2.4996 17.191 2.05631 16.225 2.005 15.2L2 15V7C2 5.93913 2.42143 4.92172 3.17157 4.17157C3.92172 3.42143 4.93913 3 6 3H18ZM12 13C11.7348 13 11.4804 13.1054 11.2929 13.2929C11.1054 13.4804 11 13.7348 11 14V14.01C11 14.2752 11.1054 14.5296 11.2929 14.7171C11.4804 14.9046 11.7348 15.01 12 15.01C12.2652 15.01 12.5196 14.9046 12.7071 14.7171C12.8946 14.5296 13 14.2752 13 14.01V14C13 13.7348 12.8946 13.4804 12.7071 13.2929C12.5196 13.1054 12.2652 13 12 13ZM12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V11C11 11.2652 11.1054 11.5196 11.2929 11.7071C11.4804 11.8946 11.7348 12 12 12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7Z"
        fill="black"
      />
    </svg>
  );
}

export default TutorialAutoSubmitNoticeStep;
