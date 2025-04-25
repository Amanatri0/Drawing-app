"use client";
import { inItDraw } from "@/app/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      inItDraw(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} width={1550} height={695}></canvas>
    </div>
  );
}
