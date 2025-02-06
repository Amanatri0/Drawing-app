import express from "express";
import userRouter from "./Users/userRoute";

const app = express();

app.use("/api/v1/user", userRouter);
// app.use("/api/v1/room", roomRouter);

app.listen(3001);
