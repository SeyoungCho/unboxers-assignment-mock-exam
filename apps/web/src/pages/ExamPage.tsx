import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ExamOmrCard from "@/components/exam/ExamOmrCard";
import { Button } from "@/components/ui/button";
import ExamPageFooter from "@/components/exam/ExamPageFooter";
import { ExitIcon } from "@/components/shared/icons";
import SubjectiveAnswerInputPad from "@/components/shared/omr-card/SubjectiveAnswerInputPad";
import {
  useExamSubmissionStore,
} from "@/stores/examSubmissionStore";
import { fetchExam } from "@/services/api";

const EXAM_SUBJECTIVE_INPUT_KEYS = [
  ".",
  "/",
  "-",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function ExamPage() {
  const navigate = useNavigate();
  const examQuery = useQuery({
    queryKey: ["exam"],
    queryFn: fetchExam,
  });

  const resetExamSubmission = useExamSubmissionStore(
    (state) => state.resetExamSubmission,
  );
  const selectedSubjectiveQuestionNumber = useExamSubmissionStore(
    (state) => state.selectedSubjectiveQuestionNumber,
  );
  const subjectiveDraft = useExamSubmissionStore(
    (state) => state.subjectiveDraft,
  );
  const appendSubjectiveDraft = useExamSubmissionStore(
    (state) => state.appendSubjectiveDraft,
  );
  const backspaceSubjectiveDraft = useExamSubmissionStore(
    (state) => state.backspaceSubjectiveDraft,
  );
  const submitSubjectiveDraft = useExamSubmissionStore(
    (state) => state.submitSubjectiveDraft,
  );

  useEffect(() => {
    resetExamSubmission();
  }, [resetExamSubmission]);

  const selectedSubjectiveIndex = useMemo(() => {
    if (!examQuery.data || selectedSubjectiveQuestionNumber == null) {
      return null;
    }

    const objectiveQuestionCount = examQuery.data.data.questions.filter(
      (question) => question.answerType === "objective",
    ).length;
    const subjectiveIndex = examQuery.data.data.questions
      .filter((question) => question.answerType === "subjective")
      .findIndex(
        (question) => question.number === selectedSubjectiveQuestionNumber,
      );

    return subjectiveIndex < 0
      ? null
      : objectiveQuestionCount + subjectiveIndex;
  }, [examQuery.data, selectedSubjectiveQuestionNumber]);

  const handleAutoSubmit = useCallback(async () => {
    if (!examQuery.data) {
      return;
    }

    navigate("/results", {
      state: {
        examInfo: examQuery.data.data,
      },
    });
  }, [examQuery.data, navigate]);

  return (
    <>
      <Button
        variant="secondary"
        className="fixed top-6 right-6 flex h-11 w-30 items-center gap-2 rounded-xl text-[17px] leading-none font-bold"
      >
        종료하기
        <ExitIcon className="size-6" />
      </Button>
      <main className="flex items-center justify-center overflow-scroll">
        <div className="flex items-center gap-15">
          {examQuery.isPending ? <div>시험 정보를 불러오는 중...</div> : null}
          {examQuery.isError ? (
            <div>
              {examQuery.error.message || "시험 정보를 불러오지 못했어요."}
            </div>
          ) : null}
          {!examQuery.isPending && !examQuery.isError ? (
            <>
              <ExamOmrCard examInfo={examQuery.data.data} />
              <div className="flex w-[240px] shrink-0 flex-col gap-6">
                <div className="text-gs7 text-[12px] font-semibold">
                  모든 주관식 답은 숫자와 소숫점, 슬래시(/), 마이너스(-) 기호로
                  이루어져 있습니다. <br />
                  <br />
                  마이너스 2분의 3을 입력할 때는 “-3/2”라고 입력하면 돼요.
                  소숫점은 유효숫자 개수를 맞춰서 입력합니다. <br />
                  <br />
                  단위가 포함된 주관식 답안은 숫자만 입력합니다.
                  <br />
                  <br />
                  예시)
                  <br /> 제3사분면 → 3 <br />
                  3,700만원 → 37000000 <br />
                  95% → 95
                </div>
                <SubjectiveAnswerInputPad
                  selectedIndex={selectedSubjectiveIndex}
                  draftValue={subjectiveDraft}
                  onAppendValue={appendSubjectiveDraft}
                  onBackspace={backspaceSubjectiveDraft}
                  onSubmit={submitSubjectiveDraft}
                  keys={EXAM_SUBJECTIVE_INPUT_KEYS}
                />
              </div>
            </>
          ) : null}
        </div>
      </main>
      <ExamPageFooter onExamTimeEnd={handleAutoSubmit} />
    </>
  );
}

export default ExamPage;
