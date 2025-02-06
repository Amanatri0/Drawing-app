import { Secret } from "jsonwebtoken";

export const JWT_SECRET: Secret =
  process.env.JWT_SECRET || "@123123Amanaaman8897!@";
