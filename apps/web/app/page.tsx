"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          style={{
            padding: "10px",
            borderRadius: "10px",
          }}
          value={roomId}
          type="text"
          placeholder="Room Id"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />

        <button
          style={{
            cursor: "pointer",
            padding: "10px",
            borderRadius: "10px",
          }}
          onClick={() => {
            router.push(`/room/${roomId}`);
          }}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
