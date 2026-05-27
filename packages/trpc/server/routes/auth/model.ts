import { z } from "zod";

export const createUserWithEmailAndPasswordInput = z.object({
  fullName: z
    .string()
    .min(3, "Name should be atleast 3 characters")
    .max(100, "Maximum name length exceeded")
    .describe("Full name of the user"),
  email: z.email().max(255, "Maximumm length of email exceeded").describe("Email of the user"),
  password: z.string().describe("Password hash of the user"),
});

export const createUserWithEmailAndPasswordOutput = z.object({
  id: z.string().describe("ID of the user"),
});

export const signInUserWithEmailAndPasswordInput = z.object({
  email: z.email().max(255, "Maximumm length of email exceeded").describe("Email of the user"),
  password: z.string().describe("Password hash of the user"),
});

export const signInUserWithEmailAndPasswordOutput = z.object({
  id: z.string().describe("ID of the user"),
});

export const getLoggedInUserInfoInput = z.undefined();

export const getLoggedInUserInfoOutput = z.object({
  id: z.string().describe("ID of the user"),
  fullName: z
    .string()
    .min(3, "Name should be atleast 3 characters")
    .max(100, "Maximum name length exceeded")
    .describe("Full name of the user"),
  email: z.email().max(255, "Maximumm length of email exceeded").describe("Email of the user"),
});
