import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";

type TutorialStepLayoutProps = {
  content: ReactNode;
  description: ReactNode;
  panel: ReactNode;
  showMissionHint?: boolean;
  isMissionComplete?: boolean;
};

function TutorialStepLayout({
  content,
  description,
  panel,
  showMissionHint = false,
  isMissionComplete = false,
}: TutorialStepLayoutProps) {
  return (
    <section className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-between gap-12">
        <div className="flex flex-1 flex-col items-center justify-center gap-12">
          {content}

          {showMissionHint ? (
            <div className="flex flex-col items-center gap-1 text-center">
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                width={24}
                height={24}
                strokeWidth={2.5}
                className="animate-bounce"
              />
              <span className="text-[19px] font-bold">
                {isMissionComplete
                  ? "좋아요! 다음으로 넘어가볼까요?"
                  : "다음으로 넘어가려면 직접 해보세요"}
              </span>
            </div>
          ) : null}

          <div className="text-center text-4xl leading-snug font-extrabold whitespace-pre-line">
            {description}
          </div>
        </div>

        {panel}
      </div>
    </section>
  );
}

export default TutorialStepLayout;
