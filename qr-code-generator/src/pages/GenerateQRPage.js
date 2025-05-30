import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qrcode from "qrcode-generator";
import PropTypes from 'prop-types';

function generateQRCodeMatrix(data) {
  const qr = qrcode(0, 'L');
  qr.addData(data);
  qr.make();
  const size = qr.getModuleCount();
  const matrix = [];

  for (let row = 0; row < size; row++) {
    const rowArray = [];
    for (let col = 0; col < size; col++) {
      rowArray.push(qr.isDark(row, col));
    }
    matrix.push(rowArray);
  }

  return matrix;
}

// Custom Canvas Renderer
function CustomQRCodeCanvas({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const size = 256;
    const matrix = generateQRCodeMatrix(data);
    const moduleSize = size / matrix.length;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, size, size);
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
      });
    });
  }, [data]);

  return <canvas ref={canvasRef} width={256} height={256} />;
}
CustomQRCodeCanvas.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.bool)
  ).isRequired,
};

function GenerateQRPage() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");
  const qrRef = useRef(null);
  const navigate = useNavigate();

  const generateQRCode = () => {
    if (!url.trim()) {
      setError("*Please enter the link to generate the QR code.");
      setShowQR(false);
      return;
    }
    setShowQR(true);
    setError("");
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
            text: "Here's a QR code generated!",
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
      <h3 className="tagline">Instantly Connect. Effortlessly Share.</h3>
      <h5 className="tagline">Generate QR Code</h5>
      <div className="input-section">
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Got a link? Drop it here"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setShowQR(false);
            setError("");
          }}
          className="url-input"
        />
        <br />
        <button onClick={generateQRCode} className="generate-button">
          Generate QR Code
        </button>
        <br />
        <button className="home-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>

      {showQR && (
        <div className="qr-container" ref={qrRef}>
          <CustomQRCodeCanvas data={url} />
          <div className="button-group">
            <button className="action-button" onClick={downloadQR}>
              Download
            </button>
            <button className="action-button" onClick={shareQR}>
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateQRPage;
