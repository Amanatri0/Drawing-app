import { Router } from "express";
import { RoomSchema } from "@repo/common/zodschema";
import { prismaClient } from "@repo/database/db";
import { UserMiddleware } from "../Middleware/userMiddleware";

export const roomRouter: Router = Router();

roomRouter.post("/room", UserMiddleware, async (req, res) => {
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
    const response = await prismaClient.room.create({
      data: {
        slug: parsedData.data.slug,
        userId: userId,
      },
    });

    res.json({
      message: `Room has been created with the roomname as "${response.slug}" by the user "${response.userId}" and the Room id is "${response.id}"`,
    });
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong while creating room ",
      error: (error as Error).message,
    });
  }
});
