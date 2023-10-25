import { useEffect, useState } from "react";
import "./Spinner.css";

interface SpinnerProps {
  sectors: string[];
  size: number;
  segmentColors: string[];
}
export default function Spinner({
  sectors,
  size,
  segmentColors,
}: SpinnerProps) {
  const [isSpinning, setIsSpinnging] = useState<boolean>(false);
  const [actualSectors, setActualSectors] = useState<string[]>(sectors);
  // const [actualSectors, setActualSectors] = useState<string[]>([...sectors]);

  let angleCurrent = 0;
  const centerX = 300;
  const centerY = 300;

  useEffect(() => {
    initWheel();
  }, []);

  useEffect(() => {
    // console.log("SECTORS", sectors);
    // clear();
    // drawWheel();
    // setActualSectors([...sectors]);
    setActualSectors(sectors);
    handleSectorUpdate();
  }, [sectors]);

  const initWheel = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    clear();
    drawWheel();
    canvas.addEventListener("click", spin, false);
  };

  const handleSectorUpdate = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.removeEventListener("click", spin, false);
    // clear();
    // draw();
    initWheel();
  };

  const clear = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // canvas.removeEventListener("click", spin, false);
    ctx.clearRect(0, 0, 600, 600);
  };

  const drawWheel = () => {
    console.log("DRAWING SECTORS", sectors);
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

    let lastAngle = angleCurrent;
    const len = actualSectors.length;
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
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    const value = actualSectors[key];

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
    // ctx.fillText(value, 0, 0);
    ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  function spin() {
    // spin the canvas wheel
    if (isSpinning === false) {
      setIsSpinnging(true);
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
      const spinAngleStart = Math.random() * 10 + 10;
      const spinTime = 0;
      const spinTimeTotal = Math.random() * 3 + 4 * 1000;
      rotateWheel(spinAngleStart, spinTime, spinTimeTotal);
    }
  }
  function rotateWheel(
    spinAngleStart: number,
    spinTime: number,
    spinTimeTotal: number
  ) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      // stopRotateWheel();
      return;
    }
    const spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    angleCurrent += (spinAngle * Math.PI) / 180;
    draw();
    const spinTimeout = setTimeout(function () {
      rotateWheel(spinAngleStart, spinTime, spinTimeTotal);
    }, 30);
  }

  function easeOut(t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

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
