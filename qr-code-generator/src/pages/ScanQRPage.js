import { useState } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";

function ScanQRPage() {
  const [scannedUrl, setScannedUrl] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setScannedUrl(code.data);
        } else {
          alert("No QR code found in the image.");
        }
      };
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="app-container">
      <h3 className="tagline">Instantly Connect. Effortlessly Share.</h3>
      <h5 className="tagline">Scan QR Code</h5>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      <br />
      <button className="home-button" onClick={() => navigate("/")}>Back to Home</button>
      {scannedUrl && (
        <div className="scanned-result">
          <p>Scanned URL:</p>
          <a href={scannedUrl} target="_blank" rel="noopener noreferrer">{scannedUrl}</a>
        </div>
      )}
    </div>
  );
}

export default ScanQRPage;