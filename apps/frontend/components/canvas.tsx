import { initDraw } from "@/app/draw";
import { useEffect, useRef } from "react";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div className="flex overflow-hidden bg-black">
      <canvas ref={canvasRef} width={1550} height={695}></canvas>
    </div>
  );
}
