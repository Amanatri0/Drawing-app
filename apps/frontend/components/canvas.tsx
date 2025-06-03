import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Circle, PencilIcon, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/app/draw/game";

export type Tool = "pencil" | "circle" | "rect";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil");
  const [game, setGame] = useState<Game>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div className="flex overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <div className=" fixed text-black top-5 left-[40%] border-amber-50 border-2 rounded-2xl px-20 py-3 bg-amber-50">
        <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      </div>
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div className="flex gap-4 cursor-pointer">
      <Icons
        activated={selectedTool === "pencil"}
        onclick={() => {
          setSelectedTool("pencil");
        }}
        icon={<PencilIcon />}
      ></Icons>
      <Icons
        activated={selectedTool === "circle"}
        onclick={() => {
          setSelectedTool("circle");
        }}
        icon={<Circle />}
      ></Icons>
      <Icons
        activated={selectedTool === "rect"}
        onclick={() => {
          setSelectedTool("rect");
        }}
        icon={<RectangleHorizontalIcon />}
      ></Icons>
    </div>
  );
}
