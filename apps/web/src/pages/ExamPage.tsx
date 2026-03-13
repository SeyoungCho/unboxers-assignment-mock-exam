import { Button } from "@/components/ui/button";
import { ExitIcon } from "@/components/shared/icons";
import { ExamHelpButton } from "@/components/exam/ExamHelpButton";

function ExamPage() {
  return (
    <>
      <Button
        variant="secondary"
        className="fixed top-6 right-6 flex h-11 w-30 items-center gap-2 rounded-xl text-[17px] leading-none font-bold"
      >
        종료하기
        <ExitIcon className="size-6" />
      </Button>
      <main>시험 페이지</main>
      <ExamPageFooter />
    </>
  );
}

function ExamPageFooter() {
  return (
    <footer className="h-exam-panel shadow-default bg-white px-15 py-6">
      <div className="flex h-full items-center justify-between gap-9">
        <div className="flex flex-col gap-2"></div>
        <div className="flex gap-3">
          <ExamHelpButton />
        </div>
      </div>
    </footer>
  );
}

export default ExamPage;
