import { useEffect, useState } from "react";

interface SpinnerProps {
  segments: string[];
  size: number;
  segmentColors: string[];
}
export default function Spinner({
  segments,
  size,
  segmentColors,
}: SpinnerProps) {
  // const [angleCurrent, setAngleCurrent] = useState(0);
  let angleCurrent = 0;
  const centerX = 300;
  const centerY = 300;
  useEffect(() => {
    initWheel();
  }, []);

  const initWheel = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    clear();
    drawWheel();
    canvas.addEventListener("click", spin, false);
  };

  const clear = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 600, 600);
  };

  const drawWheel = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + "Arial";
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 25;
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 25;
    ctx.strokeStyle = "white";
    ctx.stroke();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segmentColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = "white";
    ctx.font = "bold 1em " + "Arial";
    ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const spin = () => {
    // spin the canvas by a random amount
    const maxAngle = 8 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 3000;
    const startTime = Date.now();
    const endTime = startTime + duration;
    const startAngle = angleCurrent;
    const endAngle = angleCurrent + maxAngle;
    const spinAngleStart = Math.random() * 10 + 10;
    const spinTime = 0;
    rotate();
    function rotate() {
      const time = Date.now();
      if (time < endTime) {
        // ease out
        const spinAngle =
          (spinAngleStart - (spinAngleStart * (time - startTime)) / duration) *
          0.2;
        console.log(spinAngle);
        angleCurrent =
          startAngle +
          (endAngle - startAngle) * ((time - startTime) / duration) +
          spinAngle;
        draw();
        requestAnimationFrame(rotate);
      } else {
        angleCurrent = endAngle;
        draw();
      }
    }
  };

  const draw = () => {
    clear();
    drawWheel();
  };

  return (
    <div id="wheel">
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}
