import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircleFillIcon,
  MessageIcon,
  SpinnerIcon,
} from "@/components/shared/icons";
import { cn } from "@/lib/utils";

type HelpButtonState = "idle" | "loading" | "success";

const SUCCESS_DURATION_MS = 1500;

// TODO: replace with real API call later
async function requestTeacherHelp() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

export function ExamHelpButton() {
  const [state, setState] = useState<HelpButtonState>("idle");

  useEffect(() => {
    if (state !== "success") return;

    const timeout = setTimeout(() => {
      setState("idle");
    }, SUCCESS_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [state]);

  const isLoading = state === "loading";
  const isSuccess = state === "success";

  const handleClick = async () => {
    if (state !== "idle") return;

    setState("loading");

    try {
      await requestTeacherHelp();
      setState("success");
    } catch {
      setState("idle");
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      className={cn(
        "relative h-[60px] w-[200px] rounded-2xl font-bold transition-colors",
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 transition-opacity duration-200",
          (isLoading || isSuccess) && "opacity-0",
        )}
      >
        <MessageIcon className="size-6" />
        문제가 생겼나요?
      </span>

      <span
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200",
          isLoading ? "opacity-100" : "opacity-0",
        )}
      >
        <SpinnerIcon className="size-6 animate-spin" />
      </span>

      <span
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200",
          isSuccess ? "opacity-100" : "opacity-0",
        )}
      >
        <CheckCircleFillIcon className="size-6" />
        선생님 호출 완료!
      </span>
    </Button>
  );
}
