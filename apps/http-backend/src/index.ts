import express from "express";
import { userRouter } from "./Route/user";
import { roomRouter } from "./Route/room";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", roomRouter);

app.listen(3001);
