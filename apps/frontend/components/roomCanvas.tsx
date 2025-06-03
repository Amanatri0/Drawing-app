"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZTNlYWFmNi1jZWMxLTQ3ZmEtYTJiNS1iMjNiZGZhMWNkOGUiLCJpYXQiOjE3NDg5Mzc2MTJ9.955918b14W1gzMi4wVcvBBe_LxE7yF68TwxCfyEaUME`
    );

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });
      ws.send(data);
    };
  }, []);

  if (!socket) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return <Canvas roomId={roomId} socket={socket}></Canvas>;
}
