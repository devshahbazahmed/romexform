import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
  createUserWithEmailAndPassword,
  type GenerateUserTokenType,
  type CreateUserWithEmailAndPasswordType,
  generateUserToken,
} from "./model";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../env";

export default class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) return null;
    return result[0];
  }

  private async generateUserToken(payload: GenerateUserTokenType) {
    const { id } = await generateUserToken.parseAsync(payload);
    const token = JWT.sign({ id }, env.JWT_SECRET);
    return token;
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordType) {
    const { fullName, email, password } = await createUserWithEmailAndPassword.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db
      .insert(usersTable)
      .values({
        fullName,
        email,
        passwordHash,
      })
      .returning({ id: usersTable.id });

    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error("Something went wrong while creating the user");

    const token = await this.generateUserToken({ id: result[0].id });

    return {
      id: result[0].id,
      token,
    };
  }
}
