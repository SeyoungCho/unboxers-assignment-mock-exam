import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import ExamOmrCard from "@/components/exam/ExamOmrCard";
import { SpinnerIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { submitExam } from "@/services/api";
import { buildSubmitRequestFromStore } from "@/stores/examSubmissionStore";
import type { ExamResponseDto, SubmitResponseDto } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ResultsPageLocationState = {
  examInfo?: ExamResponseDto["data"];
  result?: SubmitResponseDto;
};

const SCAN_DURATION_MS = 3000;

function waitForScanAnimation() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, SCAN_DURATION_MS);
  });
}

function ResultsPage() {
  const location = useLocation();
  const locationState = (location.state ?? {}) as ResultsPageLocationState;
  const examInfo = locationState.examInfo;
  const [result, setResult] = useState<SubmitResponseDto | null>(
    locationState.result ?? null,
  );
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submitMutation = useMutation({
    mutationFn: submitExam,
  });

  const statusTitle = useMemo(() => {
    if (isScanning) {
      return "OMR 카드 스캔중...";
    }

    if (result) {
      return "결과 확인 완료!";
    }

    return "제출 완료!";
  }, [isScanning, result]);

  const statusDescription = useMemo(() => {
    if (isScanning) {
      return "곧 결과가 나와요";
    }

    if (result) {
      return "채점이 끝났어요. 결과를 확인해보세요.";
    }

    return "고생 많았어요. 결과를 바로 확인해볼까요?";
  }, [isScanning, result]);

  const handleShowResult = async () => {
    if (!examInfo || submitMutation.isPending || isScanning || result) {
      return;
    }

    setErrorMessage(null);
    setIsScanning(true);

    try {
      const payload = buildSubmitRequestFromStore(examInfo);
      const [submitResult] = await Promise.all([
        submitMutation.mutateAsync(payload),
        waitForScanAnimation(),
      ]);

      setResult(submitResult);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "결과를 불러오는 중 문제가 발생했어요.",
      );
    } finally {
      setIsScanning(false);
    }
  };

  if (result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-12">
        <div className="space-y-4">
          <h3 className="text-center text-xl font-semibold">
            채점이 완료되었어요!
          </h3>
          <h1 className="text-4xl font-extrabold">{result.data.title}</h1>
        </div>
        <section>
          <div className="flex flex-col gap-6">
            <div className="flex gap-12">
              <div className="flex flex-col gap-2">
                <p className="text-gs2 text-[17px] font-semibold">최종 점수</p>
                <h1 className="text-[40px] leading-none font-extrabold">
                  {result.data.score}점
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-gs2 text-[17px] font-semibold">총 문항 수</p>
                <h1 className="text-[40px] leading-none font-extrabold">
                  {result.data.results.length}문항
                </h1>
              </div>
            </div>
            <div className="grid w-lg grid-cols-3 gap-4 text-left">
              <div className="bg-secondary flex h-36 flex-col justify-between rounded-2xl px-5 py-4">
                <div>
                  <p className="text-gs2 text-sm font-semibold">정답</p>
                  <p className="text-3xl font-extrabold">
                    {result.data.correctCount}
                  </p>
                </div>
                <p className="text-gs2 justify-self-end text-end text-sm">
                  정답률{" "}
                  {(result.data.correctCount / result.data.results.length) *
                    100}
                  %
                </p>
              </div>
              <div className="bg-secondary flex h-36 flex-col justify-between rounded-2xl px-5 py-4">
                <div>
                  <p className="text-gs2 text-sm font-semibold">오답</p>
                  <p className="text-3xl font-extrabold">
                    {result.data.wrongCount}
                  </p>
                </div>
                <p className="text-gs2 justify-self-end text-end text-sm">
                  오답률{" "}
                  {(result.data.wrongCount / result.data.results.length) * 100}%
                </p>
              </div>
              <div className="bg-secondary flex h-36 flex-col justify-between rounded-2xl px-5 py-4">
                <div>
                  <p className="text-gs2 text-sm font-semibold">미응답</p>
                  <p className="text-3xl font-extrabold">
                    {result.data.unansweredCount}
                  </p>
                </div>
                <p className="text-gs2 justify-self-end text-end text-sm">
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-blue">미응답 문항 확인하기</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {result.data.results
                          .filter((result) => result.result === "unanswered")
                          .map((result) => result.number)
                          .join(", ")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Button variant="secondary" size="lg" className="w-24" asChild>
          <Link to="/">홈으로</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 px-6 py-12">
      {examInfo ? (
        <div className="relative scale-80">
          <ExamOmrCard examInfo={examInfo} readOnly />
          {isScanning ? (
            <div className="animate-scanner-sweep absolute top-0 left-4 h-full w-[50px]">
              <OmrCardScanner />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="shadow-default rounded-4xl bg-white px-8 py-10 text-center">
          표시할 시험 정보가 없어요.
        </div>
      )}

      <section className="flex w-full max-w-[680px] flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl leading-tight font-extrabold tracking-[-0.02em]">
            {statusTitle}
          </h1>
          <p className="text-4xl leading-tight font-extrabold tracking-[-0.02em]">
            {statusDescription}
          </p>
        </div>

        {errorMessage ? (
          <p className="text-red text-[17px] font-semibold">{errorMessage}</p>
        ) : null}

        {!result ? (
          <Button
            type="button"
            variant={isScanning ? "secondary" : "default"}
            className="h-[72px] w-[260px] rounded-2xl text-[24px] font-bold"
            disabled={!examInfo || isScanning}
            onClick={handleShowResult}
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <SpinnerIcon className="size-6 animate-spin" />
                과연 몇 점일까요?
              </span>
            ) : (
              "결과 보기"
            )}
          </Button>
        ) : null}
      </section>
    </main>
  );
}

function OmrCardScanner() {
  return (
    <div className="bg-scanner-gradient flex h-full flex-col">
      <div className="bg-black-gradient h-[14px] w-[50px] rounded-xl" />
      <div className="bg-red mx-auto w-1 flex-1" />
      <div className="bg-black-gradient h-[14px] w-[50px] rounded-xl" />
    </div>
  );
}

export default ResultsPage;
