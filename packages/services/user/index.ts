import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
  createUserWithEmailAndPassword,
  type GenerateUserTokenType,
  type CreateUserWithEmailAndPasswordType,
  generateUserToken,
  type SignInUserWithEmailAndPasswordType,
  signInUserWithEmailAndPassword,
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

  public async signInUserWithEmailAndPassword(payload: SignInUserWithEmailAndPasswordType) {
    const { email, password } = await signInUserWithEmailAndPassword.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);

    if (!existingUser) {
      throw new Error("User with this email does not exists");
    }

    if (!existingUser.passwordHash) {
      throw new Error("Invalid authentication method");
    }

    const isValid = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isValid) {
      throw new Error("Invalid email address or password");
    }

    const token = await this.generateUserToken({ id: existingUser.id });

    return {
      id: existingUser.id,
      token,
    };
  }

  public async getUserInfoById(id: string) {
    const user = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user || user.length === 0) throw new Error("User with this ID does not exists");

    return user[0]!;
  }

  public async verifyUserToken(token: string) {
    try {
      const payload = (await JWT.verify(token, env.JWT_SECRET)) as GenerateUserTokenType;
      return payload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
