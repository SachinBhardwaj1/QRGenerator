import React, { useEffect, useRef } from 'react';

const QRCanvas = ({ matrix }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const size = matrix.length;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = 10;

    canvas.width = size * scale;
    canvas.height = size * scale;

    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.fillStyle = cell ? '#000' : '#fff';
        ctx.fillRect(x * scale, y * scale, scale, scale);
      });
    });
  }, [matrix]);

  return <canvas ref={canvasRef} />;
};

export default QRCanvas;
