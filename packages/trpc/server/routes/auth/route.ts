import { userService } from "../../services";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailAndPasswordInput,
  createUserWithEmailAndPasswordOutput,
  getLoggedInUserInfoInput,
  getLoggedInUserInfoOutput,
  signInUserWithEmailAndPasswordInput,
  signInUserWithEmailAndPasswordOutput,
} from "./model";

const getPath = generatePath("/authentication");
const TAGS = ["Authentication"];

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPasswordInput)
    .output(createUserWithEmailAndPasswordOutput)
    .mutation(async ({ input, ctx }) => {
      const { fullName, email, password } = input;

      const { id, token } = await userService.createUserWithEmailAndPassword({
        fullName,
        email,
        password,
      });

      ctx.setCookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return {
        id,
      };
    }),

  signInUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signInUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(signInUserWithEmailAndPasswordInput)
    .output(signInUserWithEmailAndPasswordOutput)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { id, token } = await userService.signInUserWithEmailAndPassword({ email, password });
      ctx.setCookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return {
        id,
      };
    }),

  getLoggedInUserInfo: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getLoggedInUserInfo"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getLoggedInUserInfoInput)
    .output(getLoggedInUserInfoOutput)
    .query(async ({ ctx }) => {
      const { id, fullName, email } = await userService.getUserInfoById(ctx.user.id);
      return {
        id,
        fullName,
        email,
      };
    }),
});
