import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Circle, RectangleHorizontalIcon, Slash, Undo } from "lucide-react";
import { Game } from "@/app/draw/game";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export type Tool = "line" | "circle" | "rect" | "delete";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [selectedTool, setSelectedTool] = useState<Tool>("line");
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
        <Topbar
          setSelectedTool={setSelectedTool}
          selectedTool={selectedTool}
          roomId={roomId}
          clearCanvas={() => game?.clearCanvas()}
        />
      </div>
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
  roomId,
  clearCanvas,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
  roomId: string;
  clearCanvas: () => void;
}) {
  return (
    <div className="flex gap-4 cursor-pointer">
      <Icons
        activated={selectedTool === "line"}
        onclick={() => {
          setSelectedTool("line");
        }}
        icon={<Slash />}
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
      <Icons
        activated={selectedTool === "delete"}
        onclick={() => {
          setSelectedTool("delete");
          axios.delete(`${HTTP_BACKEND}/chats/${roomId}`);
          clearCanvas();
        }}
        icon={<Undo />}
      ></Icons>
    </div>
  );
}
