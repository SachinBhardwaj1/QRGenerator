import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  const generateQRCode = () => {
    setQrValue(url);
    setShowQR(true);
  };

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareQR = async () => {
    const canvas = qrRef.current.querySelector("canvas");
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "qr-code.png", { type: "image/png" });

      try {
        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: "QR Code",
            text: "Here's a QR code I generated!",
          });
        } else {
          alert("Sharing is not supported on this browser.");
        }
      } catch (err) {
        console.error("Sharing failed", err);
      }
    });
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
          onChange={(e) => {
            setUrl(e.target.value);
            setShowQR(false);
          }}
          className="url-input"
        />
        <br />
        <button onClick={generateQRCode} className="generate-button">
          Generate QR Code
        </button>
      </div>

      {showQR && (
        <div className="qr-container" ref={qrRef}>
          <QRCodeCanvas value={qrValue} size={256} />
          <div className="button-group">
            <button className="action-button" onClick={downloadQR}>Download</button>
            <button className="action-button" onClick={shareQR}>Share</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;