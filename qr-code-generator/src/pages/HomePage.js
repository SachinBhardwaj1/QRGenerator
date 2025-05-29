import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1 className="animated-title">QRGen...</h1>
      <h3 className="tagline">Instantly Connect. Effortlessly Share.</h3>
      <div className="button-group">
        <br />
        <text><h3>You can: </h3></text>
        <button onClick={() => navigate("/generate-qr-code")} className="action-button">
          Generate QR Code
        </button>
        <text><h2>/</h2></text>
        <button onClick={() => navigate("/scan-qr-code")} className="action-button">
          Scan QR Code
        </button>
      </div>
    </div>
  );
}

export default HomePage;
