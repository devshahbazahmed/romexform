import { z } from "zod";

export const createFormInput = z.object({
  title: z
    .string()
    .min(4, "Title should have atleast 4 chararcters")
    .max(100, "Title max length exceeded")
    .describe("Title of the form"),
  description: z.string().optional().describe("Description of the Form"),
});

export const createFormOutput = z.object({
  id: z.string().describe("ID of the form"),
});

export const listFormByUserIdInput = z.undefined();

export const listFormByUserIdOutput = z.array(
  z.object({
    id: z.string().describe("ID of the form"),
    title: z
      .string()
      .min(4, "Title should have atleast 4 chararcters")
      .max(100, "Title max length exceeded")
      .describe("Title of the form"),
    description: z.string().optional().describe("Description of the Form"),
    createdAt: z.date().nullable().describe("Creation timestamp"),
    updatedAt: z.date().nullable().describe("Last updated timestamp"),
  }),
);
