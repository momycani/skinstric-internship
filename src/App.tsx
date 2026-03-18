import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";
import UploadPage from "./pages/UploadPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  );
}

export default App;