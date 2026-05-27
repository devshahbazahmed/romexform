import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import {
  createFormModel,
  CreateFormModelType,
  ListFormsByUserIdInputType,
  listFormsByUserIdModel,
} from "./model";

export default class FormService {
  public async createForm(payload: CreateFormModelType) {
    const { title, description, createdBy } = await createFormModel.parseAsync(payload);

    const result = await db
      .insert(formsTable)
      .values({
        title,
        description,
        createdBy,
      })
      .returning({ id: formsTable.id });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error("Something went wrong while creating the form");
    }

    return {
      id: result[0].id,
    };
  }

  public async listFormByUserId(payload: ListFormsByUserIdInputType) {
    const { userId } = await listFormsByUserIdModel.parseAsync(payload);

    const forms = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        descripiton: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
      })
      .from(formsTable)
      .where(eq(formsTable.createdBy, userId));

    if (!forms || forms.length === 0) {
      throw new Error("No forms created yet");
    }

    return forms;
  }
}
