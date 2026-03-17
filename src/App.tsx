import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
    </Routes>
  );
}

export default App;