import { formService } from "../../services";
import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  createFormInput,
  createFormOutput,
  listFormByUserIdInput,
  listFormByUserIdOutput,
} from "./model";

const TAGS = ["Form"];

const getPath = generatePath("/form");

export const formRouter = router({
  createForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createForm"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFormInput)
    .output(createFormOutput)
    .mutation(async ({ input, ctx }) => {
      const { title, description } = input;
      const { id } = await formService.createForm({
        title,
        description,
        createdBy: ctx.user.id,
      });
      return {
        id,
      };
    }),
  listForms: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/listForms"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(listFormByUserIdInput)
    .output(listFormByUserIdOutput)
    .query(async ({ ctx }) => {
      const forms = await formService.listFormByUserId({ userId: ctx.user.id });
      return forms;
    }),
});
