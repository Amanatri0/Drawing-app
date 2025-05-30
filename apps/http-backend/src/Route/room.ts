// import { Router } from "express";
// import { RoomSchema } from "@repo/common/zodschema";
// import { prismaClient } from "@repo/database/db";
// import { UserMiddleware } from "../Middleware/userMiddleware";

// export const roomRouter: Router = Router();

// roomRouter.post("/", UserMiddleware, async (req, res) => {
//   const userId = req.userId;
//   const parsedData = RoomSchema.safeParse(req.body);

//   console.log(userId);

//   if (!parsedData.success) {
//     res.status(403).send({
//       message: "Incorrect credentials",
//     });
//     return;
//   }

//   if (typeof userId !== "string") {
//     return;
//   }
//   try {
//     const user = await prismaClient.room.create({
//       data: {
//         slug: parsedData.data.slug,
//         userId: userId,
//       },
//     });

//     res.json({
//       message: `Room has been created with the roomname as ${user.slug} by the user ${user.userId} and the Room id is ${user.id}`,
//     });
//   } catch (error) {
//     res.status(404).send({
//       message: "Something went wrong while creating room ",
//       error: (error as Error).message,
//     });
//   }
// });

// roomRouter.get("/chat/:roomId", UserMiddleware, async (req, res) => {
// const roomId = Number(req.params.roomId);

// try {
//   const chats = await prismaClient.chat.findMany({
//     where: {
//       roomId: roomId,
//     },
//     orderBy: {
//       id: "desc",
//     },
//     take: 10,
//   });

//   res.json({
//     message: chats,
//   });
// } catch (error) {
//   res.status(404).send({
//     message: "Something went wrong while retriving chats ",
//     error: (error as Error).message,
//   });
// }
// });

// roomRouter.get("/room/:slug", UserMiddleware, async (req, res) => {
// const userId = req.userId;
// const slug = req.params.slug;

// try {
//   const room = await prismaClient.room.findFirst({
//     where: {
//       slug,
//     },
//   });

//   res.json({
//     message: room,
//   });
// } catch (error) {
//   res.status(404).send({
//     message: "Something went wrong while retriving slug ",
//     error: (error as Error).message,
//   });
// }
// });
