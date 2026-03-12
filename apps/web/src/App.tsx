import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import ExamPage from "@/pages/ExamPage";
import ResultsPage from "@/pages/ResultsPage";
import TutorialPage from "@/pages/TutorialPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tutorial" replace />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
