import { errorMonitor, WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/database/db";
const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function userConnection(token: string): string | null {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (typeof decodedToken == "string") {
      return null;
    }

    if (!decodedToken) {
      return null;
    }

    return decodedToken.userId;
  } catch (error) {
    console.log((error as Error).message);
    return null;
  }
}

wss.on("connection", function connction(ws, request) {
  const url = request.url;

  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");

  if (typeof token !== "string") {
    ws.close();
    return;
  }

  const userId = userConnection(token);

  if (userId === null) {
    ws.close();
    return;
  }

  users.push({
    userId: userId,
    rooms: [],
    ws: ws,
  });

  console.log(users);

  ws.on("message", async function (data) {
    const parsedData = JSON.parse(data as unknown as string);

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);

      if (!user) {
        return;
      }

      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      console.log("Message", message);

      const responseMessage = await prismaClient.chat.create({
        data: {
          message: message,
          roomId: roomId,
          userId: userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: responseMessage.message,
              roomId,
            })
          );
        }
      });
    }
  });
});
