import { Router } from "express";
import {
  SignupSchema,
  LoginSchema,
  CreateRoomSchema,
} from "@repo/commonforall/zodtypes";

import { prismaClient } from "@repo/database/prisma";
import bcrypt from "bcrypt";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config";
import { userMiddleware } from "../middleware/user";

const userRouter: Router = Router();

userRouter.post("/signup", async (req, res) => {
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success || parsedData == undefined) {
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
        message: "User already exists in the database",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 5);

    const userCreated = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        username: parsedData.data.username,
        password: hashedPassword,
        confirmPassword: parsedData.data.confirmpassword, // FIXME: note that the zod validiation might give some error here while confirming the password
      },
    });

    res.json({
      message: `User created successfully with the username ${userCreated.username}`,
    });
  } catch (error) {
    res.status(403).send({
      message: "Soemthing went wrong in the user signup",
      error: (error as Error).message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const parsedData = LoginSchema.safeParse(req.body);

  if (!parsedData.success || parsedData == undefined) {
    res.status(403).send({
      message: "Incorrect credentials",
    });
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    console.log(user?.id);

    if (!user) {
      res.status(403).send({
        message: "User doesn't exist, Please signup! ",
      });
      return;
    }

    const verifiedPassword = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!verifiedPassword) {
      res.status(404).send({
        message: "Password doesn't match, Please enter the correct password",
      });
      return;
    }

    const token = Jwt.sign({ user: user.id }, JWT_SECRET);

    res.json({
      token: token,
      message: "User login successfull",
    });
  } catch (error) {
    res.status(403).send({
      message: "Soemthing went wrong in the user login",
      error: (error as Error).message,
    });
  }
});

userRouter.get("/details", userMiddleware, async (req, res) => {
  const user = req.userId;

  const userDeatils = await prismaClient.user.findFirst({
    where: {
      email: user,
    },
  });

  if (!userDeatils) {
    return;
  }

  const allUserDetails = await prismaClient.user.findMany({
    where: {
      id: userDeatils.id,
    },
  });

  res.json({
    allUserDetails,
  });
});

export default userRouter;
