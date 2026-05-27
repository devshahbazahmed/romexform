import { z } from "zod";
import { fieldOutputModel } from "../form-field/model";

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

export const getFormInputModel = z.object({
  formId: z.uuid().describe("UUID of the form to fetch"),
});

export const getFormOutputModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  fields: z.array(fieldOutputModel),
});
