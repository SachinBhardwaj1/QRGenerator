import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GenerateQRPage from "./pages/GenerateQRPage";
import ScanQRPage from "./pages/ScanQRPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/generate-qr-code" element={<GenerateQRPage />} />
      <Route path="/scan-qr-code" element={<ScanQRPage />} />
    </Routes>
  );
}

export default App;
