import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import TutorialLayout from "@/layouts/TutorialLayout";
import ExamPage from "@/pages/ExamPage";
import ResultsPage from "@/pages/ResultsPage";
import TutorialPage from "@/pages/TutorialPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to="/tutorial" replace />} />
          <Route element={<TutorialLayout />}>
            <Route path="/tutorial" element={<TutorialPage />} />
          </Route>
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
