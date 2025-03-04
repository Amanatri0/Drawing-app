"use client";

import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

interface ChatClientProps {
  messages: { message: string }[];
  id: string;
}

export function ChatRoomClient({ messages, id }: ChatClientProps) {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.onmessage = () => {};
    }
  });
}
