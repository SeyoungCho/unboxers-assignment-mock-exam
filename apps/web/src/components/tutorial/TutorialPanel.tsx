import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type TutorialPanelProps =
  | {
      variant: "first";
      onSkip: () => void;
      onNext: () => void;
      isNextDisabled?: boolean;
    }
  | {
      variant: "middle";
      onPrevious: () => void;
      onSkip: () => void;
      onNext: () => void;
      isNextDisabled?: boolean;
    }
  | {
      variant: "last";
      onPrevious: () => void;
      onGoToExam: () => void;
    };

function TutorialPanel(props: TutorialPanelProps) {
  return (
    <div
      className={cn("flex justify-between", {
        "justify-center": props.variant === "first",
      })}
    >
      {props.variant !== "first" ? (
        <TutorialPanelButton variant="secondary" onClick={props.onPrevious}>
          이전으로
        </TutorialPanelButton>
      ) : null}

      <div className="flex gap-3">
        {props.variant !== "last" ? (
          <TutorialPanelButton variant="secondary" onClick={props.onSkip}>
            튜토리얼 건너뛰기
          </TutorialPanelButton>
        ) : null}

        {props.variant === "last" ? (
          <TutorialPanelButton onClick={props.onGoToExam}>
            시험 화면으로 이동
          </TutorialPanelButton>
        ) : (
          <TutorialPanelButton
            disabled={props.isNextDisabled}
            onClick={props.onNext}
          >
            다음
          </TutorialPanelButton>
        )}
      </div>
    </div>
  );
}

type TutorialPanelButtonProps = ComponentProps<typeof Button>;

function TutorialPanelButton({
  children,
  className,
  ...props
}: TutorialPanelButtonProps) {
  return (
    <Button
      className={cn(
        "flex h-13 w-[243px] items-center justify-center gap-1.5 rounded-xl py-4 text-[17px] font-bold",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default TutorialPanel;
