import { inItDraw } from "@/app/draw";
import { useEffect, useRef } from "react";

export function Canvas({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      inItDraw(canvasRef.current, roomId);
    }
  }, [canvasRef]);

  return (
    <div className="flex overflow-hidden">
      <canvas ref={canvasRef} width={1550} height={695}></canvas>
      <div className="absolute space-x-2">
        <button className="bg-red-400 p-4 rounded-3xl">Rect</button>
        <button className="bg-yellow-400 p-4 rounded-3xl">Circle</button>
      </div>
    </div>
  );
}
