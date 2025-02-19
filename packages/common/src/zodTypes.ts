import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RoomSchema = z.object({
  slug: z.string(),
});
