import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import {
  createFormModel,
  CreateFormModelType,
  ListFormsByUserIdInputType,
  listFormsByUserIdModel,
} from "./model";
import { formFieldsTable } from "@repo/database/models/form-field";

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

  public async getFormWithFields(formId: string) {
    const rows = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,

        field_id: formFieldsTable.id,
        field_formId: formFieldsTable.formId,
        field_label: formFieldsTable.label,
        field_labelKey: formFieldsTable.labelKey,
        field_description: formFieldsTable.description,
        field_placeholder: formFieldsTable.placeholder,
        field_isRequired: formFieldsTable.isRequired,
        field_index: formFieldsTable.index,
        field_type: formFieldsTable.type,
        field_createdAt: formFieldsTable.createdAt,
        field_updatedAt: formFieldsTable.updatedAt,
      })
      .from(formsTable)
      .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
      .where(eq(formsTable.id, formId))
      .orderBy(formFieldsTable.index);

    /*
        {formdetails, field details},
        {formdetails, field details},
        {formdetails, field details}
            */

    if (!rows || rows.length === 0) throw new Error(`Form with ID ${formId} not found`);

    const first = rows[0]!;

    const form = {
      id: first.id,
      title: first.title,
      description: first.description ?? null,
      createdAt: first.createdAt ? first.createdAt.toISOString() : null,
      updatedAt: first.updatedAt ? first.updatedAt.toISOString() : null,
      fields: [] as Array<any>,
    };

    for (const r of rows) {
      if (!r.field_id) continue;

      form.fields.push({
        id: r.field_id,
        formId: r.field_formId,
        label: r.field_label,
        labelKey: r.field_labelKey,
        description: r.field_description ?? null,
        placeholder: r.field_placeholder ?? null,
        isRequired: r.field_isRequired,
        index: r.field_index!.toString(),
        type: r.field_type,
        createdAt: r.field_createdAt ? r.field_createdAt.toISOString() : null,
        updatedAt: r.field_updatedAt ? r.field_updatedAt.toISOString() : null,
      });
    }

    return form;
  }
}
