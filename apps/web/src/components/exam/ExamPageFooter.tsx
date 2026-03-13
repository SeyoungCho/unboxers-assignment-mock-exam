import { ExamHelpButton } from "./ExamHelpButton";

function ExamPageFooter() {
  return (
    <footer className="h-exam-panel shadow-default bg-white px-15 py-6">
      <div className="flex h-full items-center justify-between gap-9">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-[17px] font-extrabold">
            시험이 곧 시작됩니다...
          </span>
          <div className="flex items-end justify-between">
            <h3 className="text-black-gradient text-5xl font-extrabold">
              3분 17초 뒤 시작
            </h3>
            <span className="text-black-gradient text-[17px] font-semibold">
              시험 시간 60분
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-[#F5F5F5]">
            <div
              className="bg-black-gradient absolute top-0 left-0 h-full rounded-full"
              style={{ width: "20%" }}
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
