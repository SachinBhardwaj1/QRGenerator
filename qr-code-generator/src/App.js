import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = () => {
    setShowQR(true);
  };

  return (
    <div className="app-container">
      <h1 className="animated-title">QRGen</h1>
      <h3 className="tagline">Instantly Connect. Effortlessly Share.</h3>

      <div className="input-section">
        <input
          type="text"
          placeholder="Got a link? Drop it here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <br />
        <button onClick={generateQRCode} className="generate-button">
          Generate QR Code
        </button>
      </div>

      {showQR && (
        <div className="qr-container">
          <QRCodeCanvas value={url} size={256} />
        </div>
      )}
    </div>
  );
}

export default App;
