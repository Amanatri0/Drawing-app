import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/database/db";
import { LoginSchema, RoomSchema, SignupSchema } from "@repo/common/zodschema";
import cors from "cors";
import { UserMiddleware } from "./Middleware/userMiddleware";
// import { userRouter } from "./Route/user";
// import { roomRouter } from "./Route/room";

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/api/v1/user/", userRouter);
// app.use("/api/v1/room/", roomRouter);

app.post("/signup", async (req, res) => {
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(403).send({
      message: "Incorrect credentials",
    });
    return;
  }

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (existingUser) {
      res.status(500).send({
        message: `User already exists with the email address: ${existingUser.email}`,
      });
    }

    const hashPassword = await bcrypt.hash(parsedData.data.password, 5);

    if (!hashPassword) {
      return;
    }

    const response = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        username: parsedData.data.username,
        password: hashPassword,
      },
    });

    res.json({
      message: `User has been created successfully with the username: ${response.username}`,
    });
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while signup",
      error: (error as Error).message,
    });
  }
});

app.post("/login", async (req, res) => {
  const parsedData = LoginSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(403).send({
      message: "Incorrect credentials",
    });
    return;
  }

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!existingUser) {
      res.status(404).send({
        message: "User doesn't exists, Please signup",
      });
      return;
    }

    const decodedPassword = await bcrypt.compare(
      parsedData.data.password,
      existingUser.password
    );

    if (!decodedPassword) {
      res.status(404).send({
        message: "Password doesn't match, please enter the correct password",
      });
      return;
    }

    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);

    res.json({
      token: token,
    });
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while Login",
      error: (error as Error).message,
    });
  }
});

app.post("/room", UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const parsedData = RoomSchema.safeParse(req.body);

  console.log(userId);

  if (!parsedData.success) {
    res.status(403).send({
      message: "Incorrect credentials",
    });
    return;
  }

  if (typeof userId !== "string") {
    return;
  }
  try {
    const user = await prismaClient.room.create({
      data: {
        slug: parsedData.data.slug,
        userId: userId,
      },
    });

    res.json({
      message: `Room has been created with the roomname as ${user.slug} by the user ${user.userId} and the Room id is ${user.id}`,
    });
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while creating room ",
      error: (error as Error).message,
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);

  try {
    const chats = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 100,
    });

    res.json({
      message: chats,
    });
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while retriving chats ",
      error: (error as Error).message,
    });
  }
});

app.delete("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  console.log("Request received");

  try {
    const latestMessage = await prismaClient.chat.findFirst({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
    });

    if (latestMessage) {
      await prismaClient.chat.delete({
        where: {
          roomId: roomId,
          id: latestMessage.id,
        },
      });

      res.json({
        message: `Your Shape has been deleted ${latestMessage.id}`,
      });
    }
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while Deleting chats ",
      error: (error as Error).message,
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const room = await prismaClient.room.findFirst({
      where: {
        slug,
      },
    });

    res.json({
      message: room,
    });
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while retriving slug ",
      error: (error as Error).message,
    });
  }
});

app.listen(3001);
