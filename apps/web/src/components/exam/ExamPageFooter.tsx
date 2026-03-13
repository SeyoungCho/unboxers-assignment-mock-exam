import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ExamHelpButton } from "./ExamHelpButton";

const PREP_DURATION_SECONDS = 15;
const EXAM_DURATION_SECONDS = 20;
const WARNING_THRESHOLD_SECONDS = 10;
const PREP_DURATION_MS = PREP_DURATION_SECONDS * 1000;
const EXAM_DURATION_MS = EXAM_DURATION_SECONDS * 1000;

type ExamTimerPhase = "prep" | "exam" | "finished";

function formatRemainingSeconds(seconds: number) {
  if (seconds < 60) {
    return `${seconds}초`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}분`;
  }

  return `${minutes}분 ${remainingSeconds}초`;
}

function ExamPageFooter() {
  const [phase, setPhase] = useState<ExamTimerPhase>("prep");
  const [phaseStartedAt, setPhaseStartedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (phase === "finished") {
      return;
    }

    const phaseDurationMs =
      phase === "prep" ? PREP_DURATION_MS : EXAM_DURATION_MS;
    let frameId = 0;

    const tick = () => {
      const currentTime = Date.now();
      const elapsedMs = currentTime - phaseStartedAt;

      if (elapsedMs >= phaseDurationMs) {
        if (phase === "prep") {
          setPhase("exam");
          setPhaseStartedAt(currentTime);
          setNow(currentTime);
          return;
        }

        setPhase("finished");
        setNow(phaseStartedAt + phaseDurationMs);
        return;
      }

      setNow(currentTime);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [phase, phaseStartedAt]);

  const totalDurationMs = phase === "prep" ? PREP_DURATION_MS : EXAM_DURATION_MS;
  const elapsedMs =
    phase === "finished"
      ? totalDurationMs
      : Math.min(now - phaseStartedAt, totalDurationMs);
  const remainingSeconds =
    phase === "finished"
      ? 0
      : Math.max(Math.ceil((totalDurationMs - elapsedMs) / 1000), 0);
  const isWarning = remainingSeconds <= WARNING_THRESHOLD_SECONDS;
  const progressWidth = `${(elapsedMs / totalDurationMs) * 100}%`;

  const statusLabel =
    phase === "prep" ? "시험이 곧 시작됩니다..." : "시험 종료까지 남은 시간";
  const primaryText =
    phase === "prep"
      ? `${formatRemainingSeconds(remainingSeconds)} 뒤 시작`
      : formatRemainingSeconds(remainingSeconds);
  const examDurationLabel = `시험 시간 ${EXAM_DURATION_SECONDS}초`;

  return (
    <footer className="h-exam-panel shadow-default bg-white px-15 py-6">
      <div className="flex h-full items-center justify-between gap-9">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-[17px] font-extrabold">
            {statusLabel}
          </span>
          <div className="flex items-end justify-between">
            <h3
              className={cn(
                "text-5xl font-extrabold",
                isWarning ? "text-red" : "text-black-gradient",
              )}
            >
              {primaryText}
            </h3>
            <span
              className={cn(
                "text-[17px] font-semibold",
                isWarning ? "text-red" : "text-black-gradient",
              )}
            >
              {examDurationLabel}
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-[#F5F5F5]">
            <div
              key={phase}
              className={cn(
                "absolute top-0 left-0 h-full rounded-full transition-colors duration-200 ease-linear",
                isWarning ? "bg-red" : "bg-black-gradient",
              )}
              style={{ width: progressWidth }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <ExamHelpButton />
        </div>
      </div>
    </footer>
  );
}

export default ExamPageFooter;
