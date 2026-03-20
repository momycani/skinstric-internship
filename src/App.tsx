import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import AnalysisIntro from "./pages/AnalysisIntro";
import AnalysisPage from "./pages/AnalysisPage";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/analysis-intro" element={<AnalysisIntro />} />      
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
    </Routes>
  );
}

export default App;