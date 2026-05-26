import { z } from "zod";

export const createUserWithEmailAndPassword = z.object({
  fullName: z
    .string()
    .min(3, "Name should be atleast 3 characters")
    .max(100, "Maximum name length exceeded")
    .describe("Full name of the user"),
  email: z.email().max(255, "Maximumm length of email exceeded").describe("Email of the user"),
  password: z.string().describe("Password hash of the user"),
});

export type CreateUserWithEmailAndPasswordType = z.infer<typeof createUserWithEmailAndPassword>;

export const generateUserToken = z.object({
  id: z.string().describe("ID of the user"),
});

export type GenerateUserTokenType = z.infer<typeof generateUserToken>;
