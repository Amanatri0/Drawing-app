// import { Router } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/backend-common/config";
// import { LoginSchema, SignupSchema } from "@repo/common/zodschema";
// import { prismaClient } from "@repo/database/db";
// export const userRouter: Router = Router();

// userRouter.post("/signup", async (req, res) => {
//   const parsedData = SignupSchema.safeParse(req.body);

//   if (!parsedData.success) {
//     res.status(403).send({
//       message: "Incorrect credentials",
//     });
//     return;
//   }

//   try {
//     const existingUser = await prismaClient.user.findFirst({
//       where: {
//         email: parsedData.data.email,
//       },
//     });

//     if (existingUser) {
//       res.status(500).send({
//         message: `User already exists with the email address: ${existingUser.email}`,
//       });
//     }

//     const hashPassword = await bcrypt.hash(parsedData.data.password, 5);

//     if (!hashPassword) {
//       return;
//     }

//     const response = await prismaClient.user.create({
//       data: {
//         email: parsedData.data.email,
//         username: parsedData.data.username,
//         password: hashPassword,
//       },
//     });

//     res.json({
//       message: `User has been created successfully with the username: ${response.username}`,
//     });
//   } catch (error) {
//     res.status(404).send({
//       message: "Something went wrong while signup",
//       error: (error as Error).message,
//     });
//   }
// });

// userRouter.post("/login", async (req, res) => {
//   const parsedData = LoginSchema.safeParse(req.body);

//   if (!parsedData.success) {
//     res.status(403).send({
//       message: "Incorrect credentials",
//     });
//     return;
//   }

//   try {
//     const existingUser = await prismaClient.user.findFirst({
//       where: {
//         email: parsedData.data.email,
//       },
//     });

//     if (!existingUser) {
//       res.status(404).send({
//         message: "User doesn't exists, Please signup",
//       });
//       return;
//     }

//     const decodedPassword = await bcrypt.compare(
//       parsedData.data.password,
//       existingUser.password
//     );

//     if (!decodedPassword) {
//       res.status(404).send({
//         message: "Password doesn't match, please enter the correct password",
//       });
//       return;
//     }

//     const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);

//     res.json({
//       token: token,
//     });
//   } catch (error) {
//     res.status(404).send({
//       message: "Something went wrong while Login",
//       error: (error as Error).message,
//     });
//   }
// });
