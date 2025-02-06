import z from "zod";

const SignupSchema = z
  .object({
    email: z.string().email("Please enter a valid email").nonempty(),
    username: z
      .string()
      .min(3, { message: "Username cannot be less than 3 letters." })
      .nonempty(),
    firstname: z
      .string()
      .min(3, { message: "Firstname must contain alteast 3 letters" })
      .nonempty(),
    password: z.string().nonempty().min(8, {
      message:
        "Please enter atleast 8 characters as password with alphaneumeric eg:- Examplae@10972?",
    }),
    confirmpassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password must match",
    path: ["confirmpassword"],
  });

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email").nonempty(),
  password: z.string().nonempty().min(8, {
    message:
      "Please enter atleast 8 characters as password with alphaneumeric eg:- Examplae@10972?",
  }),
});

const CreateRoomSchema = z.object({
  roomname: z.string().min(2).max(20),
});

const ResetPasswordSchema = z
  .object({
    password: z.string().nonempty().min(8, {
      message:
        "Please enter atleast 8 characters as password with alphaneumeric eg:- Examplae@10972?",
    }),
    confirmpassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password must match",
    path: ["confirmpassword"],
  });

export { SignupSchema, LoginSchema, CreateRoomSchema, ResetPasswordSchema };
