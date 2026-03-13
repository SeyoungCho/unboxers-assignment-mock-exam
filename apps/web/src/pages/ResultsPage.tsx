import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { SubmitResponseDto } from "@/types";

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state as SubmitResponseDto | undefined;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <h1 className="text-2xl font-bold">채점 결과</h1>
      {result ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <p>{result.data.title}</p>
          <p>점수: {result.data.score}</p>
          <p>정답: {result.data.correctCount}</p>
          <p>오답: {result.data.wrongCount}</p>
          <p>미응답: {result.data.unansweredCount}</p>
        </div>
      ) : (
        <p>표시할 결과가 없어요.</p>
      )}
      <Button onClick={() => navigate("/exam")}>시험으로 돌아가기</Button>
    </main>
  );
}

export default ResultsPage;
