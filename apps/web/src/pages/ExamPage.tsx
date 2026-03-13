import { Button } from "@/components/ui/button";
import { ExitIcon } from "@/components/shared/icons";
import ExamPageFooter from "@/components/exam/ExamPageFooter";

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

export default ExamPage;
