import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Circle, PencilIcon, RectangleHorizontalIcon } from "lucide-react";

type Shape = "pencil" | "circle" | "rect";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [selectTool, setSelectedTool] = useState<Shape>("pencil");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div className="flex overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <div className=" fixed text-black top-10 left-[40%] border-amber-50 border-2 rounded-2xl px-30 py-5 bg-amber-50">
        <Topbar setSelectedTool={setSelectedTool} selectTool={selectTool} />
      </div>
    </div>
  );
}

function Topbar({
  selectTool,
  setSelectedTool,
}: {
  selectTool: Shape;
  setSelectedTool: (s: Shape) => void;
}) {
  return (
    <div className="flex gap-2 cursor-pointer">
      <Icons
        activated={selectTool === "pencil"}
        onclick={() => {
          setSelectedTool("pencil");
        }}
        icon={<PencilIcon />}
      ></Icons>
      <Icons
        activated={selectTool === "circle"}
        onclick={() => {
          setSelectedTool("circle");
        }}
        icon={<Circle />}
      ></Icons>
      <Icons
        activated={selectTool === "rect"}
        onclick={() => {
          setSelectedTool("rect");
        }}
        icon={<RectangleHorizontalIcon />}
      ></Icons>
    </div>
  );
}
