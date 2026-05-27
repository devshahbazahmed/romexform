import { z } from "zod";

export const createFormModel = z.object({
  title: z
    .string()
    .min(4, "Title should have atleast 4 chararcters")
    .max(100, "Title max length exceeded")
    .describe("Title of the form"),
  description: z.string().optional().describe("Description of the Form"),
  createdBy: z.uuid().max(300, "Description max length exceeded").describe("UUID of the user"),
});

export type CreateFormModelType = z.infer<typeof createFormModel>;

export const listFormsByUserIdModel = z.object({
  userId: z.uuid().describe("UUID of the user"),
});

export type ListFormsByUserIdInputType = z.infer<typeof listFormsByUserIdModel>;
